"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
// External Dependancies
const boom = require('boom');
const console_1 = require("console");
// Get Data Models
const todo_1 = require("../entity/todo");
const index_1 = require("../index");
class TodoController {
    constructor() {
        this.getTodos = async () => {
            try {
                const todoRepository = index_1.AppDataSource.getRepository(todo_1.Todo);
                const allTodos = await todoRepository.find();
                return allTodos;
            }
            catch (e) {
                throw boom.boomify(e);
            }
        };
        this.getTodoById = async (Id) => {
            try {
                const todoRepository = index_1.AppDataSource.getRepository(todo_1.Todo);
                const todo = await todoRepository.findOneById(Id);
                return todo;
            }
            catch (e) {
                throw boom.boomify(e);
            }
        };
        this.createTodos = async (request) => {
            try {
                const item = request.body;
                const todo = new todo_1.Todo();
                todo.TaskName = item.taskName;
                todo.TaskDescription = item.taskDescription;
                todo.TaskStatus = item.taskStatus;
                await index_1.AppDataSource.manager.save(todo);
                return todo;
            }
            catch (e) {
                throw boom.boomify(e);
            }
        };
        this.updateTodos = async (request) => {
            try {
                const item = request.body;
                const todoRepository = index_1.AppDataSource.getRepository(todo_1.Todo);
                const todoToUpdate = await todoRepository.findOneBy({ id: item.id });
                todoToUpdate.TaskName = item.taskName;
                todoToUpdate.TaskDescription = item.taskDescription;
                todoToUpdate.TaskStatus = item.taskStatus;
                await index_1.AppDataSource.manager.save(todoToUpdate);
                return todoToUpdate;
            }
            catch (e) {
                throw boom.boomify(e);
            }
        };
        this.deleteTodos = async (request) => {
            try {
                debugger;
                const item = request.body;
                const todoRepository = index_1.AppDataSource.getRepository(todo_1.Todo);
                const entities = await todoRepository.findByIds([item.id]);
                if (!entities) {
                    throw (0, console_1.error)(`Some Entities not found, no changes applied!`);
                }
                return todoRepository.remove(entities);
            }
            catch (e) {
                throw boom.boomify(e);
            }
        };
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map