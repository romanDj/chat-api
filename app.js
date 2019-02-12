const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./api/database/db');
const userRoutes = require('./api/routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Sync Database
db.sequelize.sync({force: false}).then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//настройка cors запросов и заголовков
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', userRoutes);

//страница ошибки
app.use((req, res, next)=> {
    res.status(404).json({error:"NOT FOUND"});
});

module.exports = app;