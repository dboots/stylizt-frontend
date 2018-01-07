//Install express server
const express = require('express');
const app = express();
const port = (process.env.PORT || 8080);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(port);

console.log('server running on ' + port);