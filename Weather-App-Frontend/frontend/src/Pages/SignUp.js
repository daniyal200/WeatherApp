import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Grid, Paper, TextField, Button, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'

const SignUp = ({ user, setUser, addUser }) => {
    const paperStyle = { padding: 20, height: '60vh', width: '25%', margin: '20px auto' }
    const gridStyle = { padding: 70 }
    const navigate = useNavigate();
    const OnLogin=()=>{
        navigate('/');
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pak Weather App
                    </Typography>
                    <Button onClick={OnLogin} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Grid style={gridStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField label="Name" placeholder='Enter Name' fullWidth required variant="standard" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                    <TextField label="Username" placeholder='Enter Username' fullWidth required variant="standard" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
                    <TextField label="Password" placeholder='Enter Password' type='password' fullWidth required variant="standard" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                    <br/><br/>
                    <Button onClick={addUser} variant="contained" fullWidth>Register</Button>
                    <Link to="/">Login</Link>
                </Paper>
            </Grid>
        </div>
    )
}

export default SignUp
