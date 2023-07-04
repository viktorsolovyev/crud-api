# Simple CRUD API

Simple CRUD API implementation with Typescript

## Installation

1. Clone/download repo (git clone https://github.com/viktorsolovyev/crud-api.git)
2. `npm install`

## Usage

**Development**

`npm run start:dev`

- App served on `http://localhost:4000` with nodemon

**Production**

`npm run start:prod`

- App served on `http://localhost:4000` without nodemon

## API

- **GET** `api/users` is used to get all persons
- **GET** `api/users/{userId}` is used to get a person by id
- **POST** `api/users` is used to create record about new user and store it in database
- **PUT** `api/users/{userId}` is used to update existing user by id
- **DELETE** `api/users/{userId}` is used to delete existing user from database by id

### User

```typescript
type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};
```

### Example request body for adding a new user

- All field are required

```json
{
  "username": "Sol",
  "age": 38,
  "hobbies": ["sleep", "eat"]
}
```
