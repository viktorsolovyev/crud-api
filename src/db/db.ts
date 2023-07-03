import { User } from '../types/User.js';

export let users: User[] = [
  { id: '109156be-c4fb-41ea-b1b4-efe1671c5836', username: 'Sol', age: 38, hobbies: ['sleep', 'eat'] },
];

export const removeUserFromDbById = (id: string): void => {
  users = users.filter((element) => element.id !== id);
};

export const addUserToDb = (user: User): void => {
  users.push(user);
};
