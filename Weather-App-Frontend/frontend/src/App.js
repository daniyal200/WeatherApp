import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from './Pages/SignUp';
import axios from "axios";
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({ name: '', username: '', password: '' });

  const addUser = async() => {
    console.log('function called');
    if (user.name === '' || user.username === '' || user.password === '') {
      alert("Please enter a value");
    } else {
      const response = await axios.post('http://localhost:8000/api/user', {
            name: user.name,
            username: user.username,
            password: user.password,
        })
    }
    
  }
  return (
    <div className="App" style={{ backgroundColor: "#EDEDED" }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login user={user} setUser={setUser}/>}></Route>
          <Route exact path='/signup' element={<SignUp user={user} setUser={setUser} addUser={addUser}/> }></Route>
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
