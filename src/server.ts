import http from 'node:http';

const host = 'localhost';
const port = 4000;

export const runServer = () => {
  http
    .createServer(function (request, response) {
      response.end();
    })
    .listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
};
