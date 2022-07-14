// External Dependancies
const boom = require('boom')

import { error } from "console";
// Get Data Models
import {Todo} from "../entity/todo";
import { AppDataSource } from "../index";

export class TodoController 
{
    constructor() {
        
    }
  
    getTodos = async () =>
    {
      try 
      {
        const todoRepository = AppDataSource.getRepository(Todo)
        const allTodos = await todoRepository.find();
        return allTodos;
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
    }

    getTodoById = async (Id:any) =>
    {
      try 
      {
        const todoRepository = AppDataSource.getRepository(Todo)
        const todo:any = await todoRepository.findOneById(Id);
        return todo;
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
    }

    createTodos = async (request:any) =>
    {
      try 
      {
        const item = request.body
        const todo = new Todo();
        todo.TaskName = item.taskName;
        todo.TaskDescription = item.taskDescription;
        todo.TaskStatus = item.taskStatus;
    
        await AppDataSource.manager.save(todo);

        return todo;
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
    }

    updateTodos = async (request:any) =>
    {
      try 
      {
        const item = request.body

        const todoRepository = AppDataSource.getRepository(Todo)
        const todoToUpdate:any = await todoRepository.findOneBy({ id: item.id });
        
        todoToUpdate.TaskName = item.taskName;
        todoToUpdate.TaskDescription = item.taskDescription;
        todoToUpdate.TaskStatus = item.taskStatus;
    
        await AppDataSource.manager.save(todoToUpdate);

        return todoToUpdate;
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
    }

    deleteTodos = async (request:any) =>
    {
      try 
      {
        debugger;
        const item = request.body

        const todoRepository = AppDataSource.getRepository(Todo)

        const entities = await todoRepository.findByIds([item.id]);
        if (!entities) {
          throw error(`Some Entities not found, no changes applied!`);
        }
        return todoRepository.remove(entities);
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
    }
}