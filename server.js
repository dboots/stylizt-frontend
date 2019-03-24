//Install express server
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;
const prerender_token = process.env.PRERENDER_TOKEN || '';
const production = (process.env.PRODUCTION === "true") || false;

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }

    next();
  }
}

if (production === true) {
  app.use(forceSSL());
}

app.use(require('prerender-node').set('prerenderToken', prerender_token));
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  console.log('sending file')
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log('-- attempting to run server on ' + port);

app.listen(port);

console.log('-- client server running on  ' + port);
