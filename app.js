const path = require('path');

const express = require('express');
const mongoose  = require('mongoose');

const teachersRoute = require("./Routes/teacherRoute");
const childRouter = require("./Routes/ChildRoute");
const classRouter = require("./Routes/ClassRoute");
const autheTeacherRoute = require('./Routes/authTeacherRoute ');
const authenticationMW = require("./Midelwares/authenticationMW");
const login=require("./Routes/authentication");

const server = express();
const port = 8080 ; 

mongoose
    .connect("mongodb://127.0.0.1:/Nursery")
    .then(() => {
        console.log("DB Connected....");
        server.listen(port, () => {
        console.log("listened successfully on Port : ",port);
        });
    })
    .catch((error) => {
        console.log("Error" + error);
});


server.use(express.json());
server.use(express.static(path.join(__dirname , 'uploads')))
server.use(teachersRoute,childRouter,classRouter,autheTeacherRoute);
// server.use(login);
// server.use(authenticationMW);

// Not Found  request url and method
server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});

// Error One Error handling
server.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MW ${error}`})
});
