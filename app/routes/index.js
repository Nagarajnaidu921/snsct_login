'use strict';

const routeCtrl = require('./route');
module.exports = app => {
   app.use('/user', routeCtrl);
};

