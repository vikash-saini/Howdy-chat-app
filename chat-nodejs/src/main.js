var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
// var config= require("./config/db.json");

dotenv.config();

const connectDb = require("./config/dbConfig");
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');


const app = express();

app.use(express.json());

connectDb();

const allMovies =[
    {title:"DDLJ"},
    {title:"Sultan"},
    {title:"Omg2"},
    {title:"ABCD"},
]

app.get('/allmovies',(req,res)=>{
    res.json(allMovies);
})

app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);

app.listen(process.env.PORT,()=>{
    console.log("app is listening on port :",process.env.PORT);
});

// mongoose.connect(process.env.DB_CONNECTION_URL).then(()=>{
//     console.log("Connected to Mongo DB");
// })
