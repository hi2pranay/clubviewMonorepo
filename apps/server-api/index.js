"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/clubview';
const server = (0, fastify_1.fastify)({
    logger: true
});
// register plugin below:
const start = async () => {
    try {
        await server.listen(8080);
        console.log('Server started successfully');
    }
    catch (err) {
        //server.log.error(err);
        process.exit(1);
    }
};
start();
