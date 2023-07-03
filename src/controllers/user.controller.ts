import { users } from '../db/db.js';
import { IncomingMessage, ServerResponse } from 'node:http';

export const getAllUsers = async (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.write(JSON.stringify(users));
};
