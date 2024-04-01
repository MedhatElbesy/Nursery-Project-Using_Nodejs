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
const dbConnection = require('./databaseConnection');

const server = express();
// const port = process.env.PORT || 8080 ; 


  const options = {
    definition: {
      openapi: '3.0.0',
      servers: [
        { url: process.env.BASE_URL }
      ],
      info: {
        title: 'NurserySystem ', 
        version: '1.0.0', 
        description:
        "The Nursery System project Using Nodejs"
      },
      security: [
        {
          apiKeyAuth: []
        }
      ],
      components: {
        securitySchemes: {
          apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key'
          }
        }
      }
    },
    apis: ['./Routes/*.js'], 
  };


dbConnection();


server.use(express.json());
server.use(express.static(path.join(__dirname , 'uploads')))
server.use(
          teachersRoute,
          childRouter,
          classRouter,
          autheTeacherRoute);

const swagerSpec = swaggerJSDoc(options);
server.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(swagerSpec));

server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});

server.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MW ${error}`})
});


