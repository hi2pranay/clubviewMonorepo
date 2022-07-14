import 'reflect-metadata';
import { fastify } from 'fastify';
import {DataSource} from "typeorm";
import {Todo} from "./entity/todo";
import { TodoController } from './controllers/todo.controller';

// External Dependancies
const boom = require('boom')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/clubview';
const server = fastify({
    logger: true
});

export const AppDataSource = new DataSource({
    type:"mongodb",
    database:"clubview",
    synchronize:true,
    logging:['query','error'],
    entities:[Todo],
    migrations:[],
    subscribers:[]
});

AppDataSource.initialize().then(() => 
{
    // here you can start to work with your database
    console.log(`database initialized`)
}).catch((error) => console.log(error))

server.register(require('fastify-cors'), {});

server.get('/api/todos', async (request, reply) => 
{
    try 
      {
        return new TodoController().getTodos();
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
});

server.get('/api/todos/:id', async (request:any, reply) => 
{
    try 
      {
        const id = request.params === undefined ? request.id : request.params.id
        return new TodoController().getTodoById(id);
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
});

server.post('/api/todos', async (request:any, reply) => 
{
    try 
      {
        return new TodoController().createTodos(request);
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
});

server.put('/api/todos', async (request:any, reply) => 
{
    try 
      {
        debugger;
        return new TodoController().updateTodos(request);
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
});

server.delete('/api/todos', async (request:any, reply) => 
{
    try 
      {
        return new TodoController().deleteTodos(request);
      } 
      catch (e) 
      {
        throw boom.boomify(e)
      }
});
  
server.listen(8080, (err, address) => 
{
    if (err) 
    {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})