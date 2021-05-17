//import express from 'express';
const express = require ('express');
const app = express();
//const Joi = require('joi');
const logger = require('./middlewares/logger');
//const auth = require ('./middlewares/auth');
const morgan = require('morgan');
//const students = require('./controllers/students');
const studentroute = require('./routes/studentroute')
const usersroute = require('./routes/usersroute');
const dotenv = require('./.env');

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use('/api/v1',studentroute);
app.use('/api/v1',usersroute);
app.use(logger);
//app.use(auth);

const port = process.env.PORT || 3000 ; 
app.listen(port,()=> console.log(`listening on port ${port}`));


