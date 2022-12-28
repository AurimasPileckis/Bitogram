import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MainContext from './context/MainContext'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'
import Header from './components/Header/Header'

import './App.css';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  

  const contextValues = { loggedIn, setLoggedIn, userInfo, setUserInfo }


  useEffect(() => {
    axios.get('/api/users/check-auth/')
    .then(resp => {
      setLoggedIn(true)
      setUserInfo(resp.data)
    })
  }, [])
  return (
    <BrowserRouter>
    <MainContext.Provider value={contextValues}>
      <Header loggedIn={loggedIn}/>
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn}/>} />
        { loggedIn && 
      <>
      <Route path="/explore" element={<Home loggedIn={loggedIn} />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/profile" element={<Profile />} />
      </>
      }
        </Routes>
    </MainContext.Provider>
  </BrowserRouter>

  );
}

export default App;
