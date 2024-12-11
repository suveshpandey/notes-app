require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { userRouter } = require('./routes/user');


const app = express();

const allowedOrigins = [
    "http://localhost:5173", // Local development
    "https://neura-notes-frontend.onrender.com" // Production frontend
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true // Allow cookies and credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRouter);



app.listen(PORT, () => console.log("Server is running..."));