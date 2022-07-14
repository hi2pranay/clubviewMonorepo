"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import our Controllers
const todo_controller_1 = require("../controllers/todo.controller");
const routes = [
    {
        method: 'GET',
        url: '/api/todos',
        handler: new todo_controller_1.TodoController().getTodos()
    }
];
module.exports = routes;
//# sourceMappingURL=index.js.map