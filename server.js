//Install express server
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const prerender_token = process.env.PRERENDER_TOKEN || '';

// app.use(
//   require('prerender-node')
//     .set('protocol', 'http')
//     .set('prerenderServiceUrl', 'https://h2c-prerender.herokuapp.com/')
// );
app.use(require('prerender-node').set('prerenderToken', prerender_token));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

console.log('attempting to run server on ' + port);

// Start the app by listening on the default Heroku port
app.listen(port);

console.log('server running on ' + port);
