const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// Importing routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

// settings

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: '',     // <-- Here the mysql server address
    user: '',     // <-- Here the user
    password: '', // <-- Here the password
    port: 3306,   // <-- Here the port, by default it is port 3306
    database: ''  // <-- Here the name of the database
}, 'single'));
app.use(express.urlencoded({extended: false}));


// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});