const express = require('express'),
bodyParser = require('body-parser'),
apiai = require('apiai'),
request = require('request'),
config = require('./config')


const app = express();
app.use(bodyParser.json());
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d', server.address().port);
});