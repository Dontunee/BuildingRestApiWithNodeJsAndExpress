const config = require('config');
const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:database');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');//load the courses module
const authenticate = require('./middleware/Authenticate');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

//process.env.NODE_ENV // To get the current environment
//GetConfiguration
console.log("Application name:" + config.get("name") );
//console.log("Mail server:" + config.get("mail.host"));
//console.log("Mail password:" + config.get("mail.password"));


//Add a middleware to be used in request processing pipeline to have access to json body
//read the request and checks if it has a body and try to convert to json
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//method to add a middleware to our request processing pipeline
app.use(logger)
app.use(express.static('public'));
app.use(helmet);// For security 

app.use('/api/courses', courses);//For any route that starts with /api/courses go to that module


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
   // console.log('Morgan enabled');
   startupDebugger('Morgan enabled');//enable debugging
}

app.use(morgan('tiny')); //To log http requests
app.use(authenticate);





//PORT
const port = process.env.PORT || 50001;
app.listen(port, () => console.log(`listening on port ${port}.....`));

