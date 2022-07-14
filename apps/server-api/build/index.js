"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const fastify_1 = require("fastify");
const typeorm_1 = require("typeorm");
const todo_1 = require("./entity/todo");
const todo_controller_1 = require("./controllers/todo.controller");
// External Dependancies
const boom = require('boom');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/clubview';
const server = (0, fastify_1.fastify)({
    logger: true
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    database: "clubview",
    synchronize: true,
    logging: ['query', 'error'],
    entities: [todo_1.Todo],
    migrations: [],
    subscribers: []
});
exports.AppDataSource.initialize().then(() => {
    // here you can start to work with your database
    console.log(`database initialized`);
}).catch((error) => console.log(error));
server.register(require('fastify-cors'), {});
server.get('/api/todos', async (request, reply) => {
    try {
        return new todo_controller_1.TodoController().getTodos();
    }
    catch (e) {
        throw boom.boomify(e);
    }
});
server.get('/api/todos/:id', async (request, reply) => {
    try {
        const id = request.params === undefined ? request.id : request.params.id;
        return new todo_controller_1.TodoController().getTodoById(id);
    }
    catch (e) {
        throw boom.boomify(e);
    }
});
server.post('/api/todos', async (request, reply) => {
    try {
        return new todo_controller_1.TodoController().createTodos(request);
    }
    catch (e) {
        throw boom.boomify(e);
    }
});
server.put('/api/todos', async (request, reply) => {
    try {
        debugger;
        return new todo_controller_1.TodoController().updateTodos(request);
    }
    catch (e) {
        throw boom.boomify(e);
    }
});
server.delete('/api/todos', async (request, reply) => {
    try {
        return new todo_controller_1.TodoController().deleteTodos(request);
    }
    catch (e) {
        throw boom.boomify(e);
    }
});
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=index.js.map