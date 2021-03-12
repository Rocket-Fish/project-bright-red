/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const { renderToString } = require('@vue/server-renderer');
const manifest = require('./dist/server/ssr-manifest.json');
const axios = require('axios');
const { DateTime } = require("luxon");


// Create the express app.
const server = express();
// Compress all HTTP responses
server.use(compression());

const enforceHTTPS = (req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
server.use(enforceHTTPS)

// we do not know the name of app.js as when its built it has a hash name
// the manifest file contains the mapping of "app.js" to the hash file which was created
// therefore get the value from the manifest file thats located in the "dist" directory
// and use it to get the Vue App
const appPath = path.join(__dirname, './dist', 'server', manifest['app.js']);
const createApp = require(appPath).default;

const clientDistPath = './dist/client';
server.use('/img', express.static(path.join(__dirname, clientDistPath, 'img')));
server.use('/js', express.static(path.join(__dirname, clientDistPath, 'js')));
server.use('/css', express.static(path.join(__dirname, clientDistPath, 'css')));
server.use('/favicon.ico', express.static(path.join(__dirname, clientDistPath, 'favicon.ico')));

const routeHandler = async (req, res) => {
  const { app } = await createApp(req);

  let appContent = await renderToString(app);

  fs.readFile(path.join(__dirname, clientDistPath, 'index.html'), async (err, html) => {
    if (err) {
      throw err;
    }

    appContent = `<div id="app">${appContent}</div>`;

    if(req.params.id) {
      const url = `${process.env.VUE_APP_BACKEND_URL}/event/quick?url=${req.params.id}`
      try {
        const {data} = await axios.get(url)
        const title = data.name;
        const dateTime = DateTime.fromISO(data.event_time)
        const strTime = dateTime.toFormat("MMMM dd, yyyy - hh:mm a ZZZZ")
        html = html.toString().replace(/content="Queue tool for XIV"/g, `content="${strTime}"`)
        html = html.toString().replace(/content="XIV Queue"/g, `content="${title}"`)
      } catch(e) {
        console.log(`${url} - request error`)
      }
    }

    html = html.toString().replace('<div id="app"></div>', `${appContent}`);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
}

server.get('/4/:id', routeHandler)

// handle all routes in our application
server.get('*', routeHandler);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`You can navigate to http://localhost:${port}`);
});
