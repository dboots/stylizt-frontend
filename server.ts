/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import "@angular/localize/init";
import "zone.js/dist/zone-node";

import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import * as path from "path";
import * as compression from "compression";

import { AppServerModule } from "./src/main.server";
import { APP_BASE_HREF } from "@angular/common";
import { existsSync } from "fs";
import { environment } from "src/environments/environment";

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = path.join(process.cwd(), "dist/client/browser");
  const indexHtml = existsSync(path.join(distFolder, "index.original.html"))
    ? "index.original.html"
    : "index";
  const isProduction =
    process.env.PRODUCTION === "TRUE" || process.env.PRODUCTION;

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set("view engine", "html");
  server.set("views", distFolder);
  server.use(compression());

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    "*.*",
    express.static(distFolder, {
      maxAge: "1y",
    })
  );

  if (environment.production) {
    server.enable("trust proxy");
    server.use(function (req, res, next) {
      console.log("production", req.subdomains);
      if (req.secure) {
        // https request or production status, nothing to handle
        if (req.subdomains && req.subdomains.length) {
          res.redirect(
            301,
            "https://" +
              req.headers.host +
              req.url +
              "/portfolio" +
              "/" +
              req.subdomains[0]
          );
        } else {
          next();
        }
      } else {
        // this is an http request, redirect to https
        res.redirect(301, "https://" + req.headers.host + req.url);
      }
    });
  }

  // All regular routes use the Universal engine
  server.get("*", (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: req.baseUrl,
        },
      ],
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
  run();
}

export * from "./src/main.server";
