import express from "express";
import connectDB from './config/database.js';


const app = express();



app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    // Connect to database
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});



