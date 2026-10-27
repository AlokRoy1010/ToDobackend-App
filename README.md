# Simple To-Do App Backend

## Features
- Create, Read, Update, Delete Todos
- MongoDB + Mongoose
- Express.js

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running (local or Atlas).
   Update `.env` if needed.

3. Start the server:
```bash
npm start
```

## API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | /todos         | Create a new todo        |
| GET    | /todos         | Get all todos            |
| GET    | /todos/:id     | Get a single todo        |
| PUT    | /todos/:id     | Update a todo            |
| DELETE | /todos/:id     | Delete a todo            |

## Example Request Body (POST / PUT)

```json
{
  "title": "পড়াশুনা",
  "description": "Node.js শিখব",
  "completed": false
}
```
# ToDobackend-App
