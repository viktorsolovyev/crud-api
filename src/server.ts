import http from 'node:http';
import { getAllUsers, getUsersById } from './controllers/user.controller.js';

const host = 'localhost';
const port = 4000;

export const runServer = () => {
  http
    .createServer(async function (request, response) {
      if (request.url === '/api/users' && request.method === 'GET') {
        await getAllUsers(request, response);
      } else if (request.url?.includes('/api/users/') && request.url?.replace('/api/users/', '').length) {
        if (request.method === 'GET') await getUsersById(request, response);
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(400);
        response.write(JSON.stringify('Bad request'));
      }

      response.end();
    })
    .listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
};
