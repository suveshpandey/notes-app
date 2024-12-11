// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const PORT = process.env.PORT || 3000;
// const { userRouter } = require('./routes/user');


// const app = express();

// // app.use(cors({
// //     origin: process.env.FRONTEND_URL || "http://localhost:5173",
// //     methods:['GET', 'POST', 'PUT', 'DELETE'],
// //     credentials: true
// // }));

// // CORS configuration to allow all origins
// app.use(cors({
//     origin: "*",  // Allow all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true // Allow cookies and credentials
// }));

// // app.use(cors(corsOptions));
// app.use(express.json());
// app.use('/user', userRouter);



// app.listen(PORT, () => console.log("Server is running..."));


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');  // We need this to handle paths
const PORT = process.env.PORT || 3000;
const { userRouter } = require('./routes/user');

const app = express();

// CORS configuration to allow all origins
app.use(cors({
    origin: "*",  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies and credentials
}));

// Serve static files from the `dist` folder
app.use(express.static(path.join(__dirname, 'dist'))); // Point to the dist folder inside backend

// Routes
app.use('/user', userRouter);

// Fallback to index.html for all other routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log("Server is running..."));
