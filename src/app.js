const express = require('express');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = express.Router();
//Rotas
const index = require('./routes/index');
const curriculoRoute = require('./routes/curriculoRoute');
app.use('/', index);
app.use('/curriculos', curriculoRoute);
module.exports = app;