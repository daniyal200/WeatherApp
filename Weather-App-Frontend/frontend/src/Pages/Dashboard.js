import React, { useState, useEffect } from 'react'
import { Avatar, Paper, TextField, Button, Box, Toolbar } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from '@mui/system';
import Grid from "@material-ui/core/Grid";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop:'2%'
    }
});
const Dashboard = ({ user, setUser }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState();
    const navigate = useNavigate();
    const classes = useStyles();
    const paperStyle = { padding: 20, height: '80vh', width: '77%', margin: '20px auto' }
    const gridStyle = { padding: 70 }
    const getAllWeathers = async () => {
        console.log(" USER ", user);
        let response = await axios.post('http://localhost:8000/api/user/getUser',{username:user.username})
        if (response && response?.data) {
            console.log("ADD CITY... ");
            console.log(response.data);
            setUser(response.data);
        }
    }
    const OnLogout=()=>{
        navigate("/");
    }
    const addCity = async () => {
        let response = await axios.post('http://localhost:8000/api/weather/addWeather', {
            cityName:city,
            username: user.username
        });
        getAllWeathers();
        console.log('city>>>', city)
    }
    useEffect(() => {
        console.log("USER >>> ", user);
    }, [user]);
    return (
        
        <div>
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pak Weather App
          </Typography>
          <Button color="inherit" onClick={OnLogout}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </Box>
            <Grid style={gridStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <div style={{ display: 'flex', justifyContent:'center'}}>
                            <TextField label="City" placeholder='Enter City Name' variant="standard" value={city} onChange={e => setCity(e.target.value)} />
                            <Button onClick={addCity} variant="contained">Add City</Button>
                        </div>

                    </Grid>
                    <Grid className={classes.root} container spacing={3}>
                        {
                            (user && user?.cities && user?.cities?.length > 0) ?

                                user?.cities.map((item, key) => (
                                    <Grid item xs={4} spacing={2}>
                                        <Card style={{ backgroundColor: '#b9b1b1' }}>
                                            <CardContent style={{}}>
                                                <Typography variant="h5"  gutterBottom>
                                                    {item.city}
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    {item.temp}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                    <br />
                                                    {item.date}  
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                                : <>No record</>
                        }

                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default Dashboard
