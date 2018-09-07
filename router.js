const querystring = require('querystring');
const render = require('./render');

const index = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  if(request.url === "/"){
    if(request.method.toLowerCase() === "get"){
      // if url == "/" && method == GET
      response.write(render.renderLorem({}));
      response.end();
    } else {
      // if url == "/" && method == POST
      // get the post data from body
      request.on("data", postBody => {
        // extract the username
        const query = querystring.parse(postBody.toString());
        response.write(render.renderLorem(query));
      });

      // Output an error if it occurs
      request.on("error", error => {
        render.renderLorem({ type: "error", error: error });
      });

      request.on("end", () => response.end());
    }
  } else {
    // Display a not-found template for other routes
    response.write(render.notFoundFile);
    response.end();
  }
}

module.exports.index = index;