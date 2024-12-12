// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const PORT = process.env.PORT || 3000;
// const { userRouter } = require('./routes/user');


// const app = express();

// app.use(cors({
//     origin: "https://neura-notes-frontend.vercel.app/",
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// app.use(express.json());
// app.use('/user', userRouter);



// app.listen(PORT, () => console.log("Server is running..."));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { userRouter } = require('./routes/user');

const app = express();

// CORS configuration to allow multiple origins
const allowedOrigins = [
    "https://neura-notes-frontend.vercel.app", // Deployed frontend
    "http://localhost:5173" // Local development frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/user', userRouter);

app.listen(PORT, () => console.log("Server is running..."));
