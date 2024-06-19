const express = require('express');
const mongoose = require('mongoose');

const libraryRoute = require('./route/libraryRoute');
const authorRoute = require('./route/authorRoute');
const bookRoute = require('./route/bookRoute');

const app = express();

app.use(express.json());

// routes
app.use('/library',libraryRoute);
app.use('/author',authorRoute);
app.use('/book',bookRoute);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

mongoose.connect("mongodb://localhost:27017/LibraryAPI").then(() => {
    console.log("MongoDB connected successfully");
}).catch((error)=>{
    console.log(error);
});