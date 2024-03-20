import { useEffect, useState } from 'react';
//import './App.css';
import User from './pages/user/User.jsx'
import Login from './pages/login/Login.jsx'
import EditRoute from './pages/routes/EditRoute.jsx'
import Register from './pages/register/Register.jsx'
import CreateRoute from './pages/routes/CreateRoute.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/User" element={<User />} />
            <Route path="/Register" element={<Register/>}/>
            <Route path="/RouteCreate" element={<CreateRoute/>}/>
            <Route path="/RouteEdit" element={<EditRoute/>}/>
        </Routes>
    );
}

export default App;