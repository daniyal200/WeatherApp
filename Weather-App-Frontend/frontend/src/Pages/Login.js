import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Grid, Paper, TextField, Button, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'
const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const paperStyle = { padding: 20, height: '60vh', width: '25%', margin: '20px auto' }
  const gridStyle = { padding: 70 }

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert("Please enter a value");
    }
    else {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        username,
        password,
      });
      if (response.status === 200) {
        // Save the user token in local storage
        navigate('/dashboard')
      } else {
          console.log(response.Error)
          alert('Invalid Creds')
      }
    }
  }
  const OnSignup =()=>{
    navigate('/signup')
  }
  return (
<div>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pak Weather App
          </Typography>
          <Button onClick={OnSignup}color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid style={gridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar><LockOutlinedIcon /></Avatar>
          <h2>LOGIN</h2>
        </Grid>
        <TextField label="Username" placeholder='Enter Username' fullWidth required variant="standard" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" placeholder='Enter Password' type='password' fullWidth required variant="standard" value={password} onChange={e => setPassword(e.target.value)} />
        Remember Me <Checkbox/>
        <Button onClick={handleLogin} variant="contained" fullWidth>LOGIN</Button>
      </Paper>
    </Grid>
    </div>
  )
}

export default Login
