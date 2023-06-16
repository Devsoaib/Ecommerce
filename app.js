const { readdirSync } = require("fs");
const path = require("path");
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');



// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())

// routes middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`))) 

//Db connection
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("DB is connected");
}).catch((err)=>{
    console.log("db is not connected");
    console.log(err.message);
    process.exit(1);
})

//home route


//unknown routes
app.use((req, res, next)=>{
    res.status(404).json({
        status: false,
        message: "not found"
    })
})

//err handlers

app.use((err, req, res, next)=>{
    if (err) {
        res.status(401).json({
            status: false,
        message: "something broke"
        })
    } else {
        res.status(401).json({
            status: false,
        message: "something broke"
        })
    }
})


module.exports = app;

