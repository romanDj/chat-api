const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

//https://sequelize.readthedocs.io/en/v3/docs/models-definition/