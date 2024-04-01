const path = require('path');

const express = require('express');
const mongoose  = require('mongoose');
require('dotenv').config()
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');


const teachersRoute = require("./Routes/teacherRoute");
const childRouter = require("./Routes/ChildRoute");
const classRouter = require("./Routes/ClassRoute");
const autheTeacherRoute = require('./Routes/authRoute ');

const server = express();
const port = 8080 ; 

// const option = {
//     definition:{
//         openapi : '3.0.0',
//         info : {
//             title : 'Node JS API Project For Nurisy',
//             version : '1.0.0'
//         },
//         server:[
//             {
//                 url: 'http://localhost:8080/'
//             }
//         ]
//     },
//     apis:['./Routes/*']
// };
const options = {
    definition: {
      openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      servers: [
        { url: 'http://localhost:8080/' }
      ],
      info: {
        title: 'NurserySystem Documentation', 
        version: '1.0.0', 
        description:
        ""
      },
   
    },
    // Path to the API docs
    apis: ['./Routes/*.js'], // Path to the API docs
  };




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
// dbConnection();



server.use(express.json());
server.use(express.static(path.join(__dirname , 'uploads')))
server.use(teachersRoute,childRouter,classRouter,autheTeacherRoute);

const swagerSpec = swaggerJSDoc(options);
server.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(swagerSpec));
// server.use(authenticationMW);

// Not Found  request url and method
server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});

// Error One Error handling
server.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MW ${error}`})
});


// app.use(express.json());
// app.use(express.static(path.join(__dirname,'uploads')));


// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'));
//     console.log(`mode is ${process.env.NODE_ENV}`);
// };