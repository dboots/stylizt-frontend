//Install express server
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const prerender_token = process.env.PRERENDER_TOKEN || '';
const path = require('path');

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }
  
  // Instruct the app
  // to use the forceSSL
  // middleware
  app.use(forceSSL());
  app.use(require('prerender-node').set('prerenderToken', prerender_token));
  app.use(express.static(__dirname + '/dist'));
  
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
  
  console.log('-- attempting to run server on ' + port);
  
  // Start the app by listening on the default Heroku port
  app.listen(port);
  
  console.log('-- client server running on  ' + port);
  