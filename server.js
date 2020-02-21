// emporting required packages 
const routes = require('./modules');
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

//parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))

const port = 8080;

//to Connect  mongodb

mongoose.connect('mongodb://localhost:27017/userDetails', { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api', routes.routes);
app.listen(port);

console.log('Server Started at  port ' + port);







