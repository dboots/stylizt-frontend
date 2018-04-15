//Install express server
const express = require('express');
const app = express();
const port = (process.env.PORT || 8088);
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port);

console.log('server running on ' + port);
