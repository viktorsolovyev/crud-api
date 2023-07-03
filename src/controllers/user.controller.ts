import * as db from '../db/db.js';
import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export const getAllUsers = async (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.write(JSON.stringify(db.users));
};

export const getUserById = async (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');
  const userId = request.url?.replace('/api/users/', '');
  if (userId && uuidValidate(userId)) {
    const user = db.users.find((element) => element.id === userId);
    if (user) {
      response.writeHead(200);
      response.write(JSON.stringify(user));
    } else {
      response.writeHead(404);
      response.write(JSON.stringify(`User with id=${userId} not found`));
    }
  } else {
    response.writeHead(400);
    response.write(JSON.stringify(`User id: ${userId} is invalid (not uuid)`));
  }
};

export const removeUserById = async (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');
  const userId = request.url?.replace('/api/users/', '');
  if (userId && uuidValidate(userId)) {
    const user = db.users.find((element) => element.id === userId);
    if (user) {
      db.removeUserFromDBById(userId);
      response.writeHead(204);
    } else {
      response.writeHead(404);
      response.write(JSON.stringify(`User with id=${userId} doesn't exist`));
    }
  } else {
    response.writeHead(400);
    response.write(JSON.stringify(`User id: ${userId} is invalid (not uuid)`));
  }
};
