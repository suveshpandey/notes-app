import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';

const routes = (
    <Router>
        <Routes>
            <Route path="/dashboard" exact element={<Home />}></Route>
            <Route path="/signup" exact element={<Signup />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
        </Routes>
    </Router>
)
const App = () => {
    return (
        <div className='h-[100vh] '>
            {routes}
        </div>
    )
}

export default App
