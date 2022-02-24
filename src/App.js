import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './Screens/Authentication/Login/Login';
import Signup from './Screens/Authentication/Signup/Signup';
import ForgotPassword from './Screens/Authentication/ForgotPassword/ForgotPassword';
import Profile from './Screens/Profile/Profile';
import Home from './Screens/Home/Home';
import Post from './Screens/Post/Post';
import CreateTopic from './Screens/Create/CreateTopic/create-topic'
import CreatePost from './Screens/Create/CreatePost/create-post'
import EditProfile from './Screens/Profile/EditProfile';
import Timeline from './Screens/Timeline/timeline';
import Topic from './Screens/Topic/topic';

function App() {
  return (
      
        <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/createtopic" element={<CreateTopic />} />
              <Route path="/post/*" element={<Post />} />
              <Route path="/edit_profile" element={<EditProfile />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/topic/*" element={<Topic />} />
          </Routes>
        </Router>
      
        
    
  ); // add space for image
}

export default App;
