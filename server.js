//Install express server
const express = require('express');
const app = express();
const port = (8188);
const path = require('path');
const prerender = require('prerender');

// Start prerender server;
prerender().start();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

console.log('attempting to run server on ' + port);

// Start the app by listening on the default Heroku port
app.listen(port);

console.log('server running on ' + port);
