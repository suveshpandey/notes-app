// import React, { useState } from 'react'
// import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// import Home from './pages/Home'
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Verification from './pages/Verification';
// import ChangePass from './pages/ChangePass';

// const App = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     return (
//         <div className="h-[100vh]">
//             <Router>
//                 <Routes>
//                     <Route path="/dashboard" exact element={<Home username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword}  />} />
//                     <Route path="/signup" exact element={<Signup username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />}/>
//                     <Route path="/verification" exact element={<Verification />} />
//                     <Route path="/login" exact element={<Login username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
//                     <Route path="/change-pass" exact element={<ChangePass email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
//                 </Routes>
//             </Router>
//         </div>
//     );
// }

// export default App

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verification from './pages/Verification';
import ChangePass from './pages/ChangePass';

const App = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="h-[100vh]">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="signup" />} />
                    <Route path="/dashboard" element={<Home username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
                    <Route path="/signup" element={<Signup username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
                    <Route path="/verification" element={<Verification />} />
                    <Route path="/login" element={<Login username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
                    <Route path="/change-pass" element={<ChangePass email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
