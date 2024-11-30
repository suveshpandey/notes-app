require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { userRouter } = require('./routes/user');

const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', userRouter);



app.listen(PORT, () => console.log("Server is running..."));