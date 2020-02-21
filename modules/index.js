const express = require('express');
const user = require('./User');

const routes = express.Router();


routes.use('/users', user.routes);


module.exports = {
    routes,
};



