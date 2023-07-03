import * as db from '../db/db.js';
import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { User } from '../types/User.js';

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
      db.removeUserFromDbById(userId);
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

export const addUser = async (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');
  //   response.writeHead(201);
  //   response.write(JSON.stringify(request.));
  //   response.write(JSON.stringify(body));
  const requestCheckResult = await isValidRequest(request);

  if (requestCheckResult.isValid && requestCheckResult.user) {
    db.addUserToDb(requestCheckResult.user);
    response.writeHead(201);
    response.write(JSON.stringify(requestCheckResult.user));
  } else {
    response.writeHead(400);
    response.write(JSON.stringify(requestCheckResult.errorMessage));
  }
};

const isValidRequest = async (
  request: IncomingMessage,
): Promise<{ isValid: boolean; user?: User; errorMessage?: string[] }> => {
  const errors: string[] = [];
  const body = await getJSONDataFromRequestStream<User>(request);
  if (body.username === undefined || typeof body.username !== 'string') {
    errors.push('Field username is required and its should be string type');
  }
  if (body.age === undefined || typeof body.age !== 'number') {
    errors.push('Field age is required and its should be number type');
  }
  if (
    body.hobbies === undefined ||
    !Array.isArray(body.hobbies) ||
    !body.hobbies.every((element) => typeof element === 'string')
  ) {
    errors.push('Field hobbies is required and its should be array of strings or empty array');
  }
  if (errors.length) {
    return {
      isValid: false,
      errorMessage: errors,
    };
  }

  return {
    isValid: true,
    user: { id: uuidv4(), username: body.username, age: body.age, hobbies: body.hobbies },
  };
};

function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(JSON.parse(Buffer.concat(chunks).toString()));
    });
  });
}
