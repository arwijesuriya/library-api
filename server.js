const express = require("express");
const app = express();

// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});