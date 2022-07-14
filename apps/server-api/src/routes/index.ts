// Import our Controllers
import {TodoController} from "../controllers/todo.controller";

const routes = [
  {
    method: 'GET',
    url: '/api/todos',
    handler: new TodoController().getTodos()
  }
]

module.exports = routes
