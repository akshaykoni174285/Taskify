// global modules
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'

// initializations
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;


// custom imports
import MongoConnect from './config/db.js'

// middlewares
MongoConnect()
app.use(express.json())
app.use(morgan("dev"))

// api calls 

app.get('/',(req, res) => {
    res.send("welcome to my new taskify project lads").status(200)
})
app.listen(port,() => {
    console.log("listening on port " + port);
})



