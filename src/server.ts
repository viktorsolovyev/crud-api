import http from 'node:http';
import { addUser, changeUserById, getAllUsers, getUserById, removeUserById } from './controllers/user.controller.js';

const host = 'localhost';
const port = 4000;

export const runServer = () => {
  const server = http.createServer().listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  server.on('request', async function (request, response) {
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
          case 'PUT':
            await changeUserById(request, response);
            break;
          case 'DELETE':
            await removeUserById(request, response);
            break;
        }
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(404);
        response.write(JSON.stringify('Endpoint does not exist'));
      }
    } catch {
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(500);
      response.write(JSON.stringify('Internal server error'));
    }

    response.end();
  });
};
