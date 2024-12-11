require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { userRouter } = require('./routes/user');


const app = express();
// Define allowed origins
const allowedOrigins = [
    "http://localhost:5173", // Local development
    "https://neura-notes-frontend.onrender.com", // Production frontend
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            // Allow requests without origin (e.g., from Postman, mobile apps)
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true, // Allow credentials (cookies, session, etc.)
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRouter);



app.listen(PORT, () => console.log("Server is running..."));
