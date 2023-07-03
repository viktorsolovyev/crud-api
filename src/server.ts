import http from 'node:http';
import { addUser, getAllUsers, getUserById, removeUserById } from './controllers/user.controller.js';

const host = 'localhost';
const port = 4000;

export const runServer = () => {
  http
    .createServer(async function (request, response) {
      try {
        if (request.url === '/api/users') {
          switch (request.method) {
            case 'GET':
              await getAllUsers(request, response);
              break;
            case 'POST':
              await addUser(request, response);
              break;
          }
        } else if (request.url?.includes('/api/users/') && request.url?.replace('/api/users/', '').length) {
          switch (request.method) {
            case 'GET':
              await getUserById(request, response);
              break;
            case 'DELETE':
              await removeUserById(request, response);
              break;
          }
        } else {
          response.setHeader('Content-Type', 'application/json');
          response.writeHead(400);
          response.write(JSON.stringify('Bad request'));
        }
      } catch {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(500);
        response.write(JSON.stringify('Internal server error'));
      }

      response.end();
    })
    .listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
};
