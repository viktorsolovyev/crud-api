import http from 'node:http';
import { getAllUsers } from './controllers/user.controller.js';

const host = 'localhost';
const port = 4000;

export const runServer = () => {
  http
    .createServer(async function (request, response) {
      if (request.url === '/api/users') {
        await getAllUsers(request, response);
      }
      // else if(request.url == "/about"){
      //     response.write("<h2>About</h2>");
      // }
      // else if(request.url == "/contact"){
      //     response.write("<h2>Contacts</h2>");
      // }
      else {
        response.write('Not found');
      }

      response.end();
    })
    .listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
};
