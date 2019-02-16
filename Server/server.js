const Hapi=require('hapi');
const getBooksData = require('./Routes/getBooksData.route');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8081,
});

// Add the route
server.route(getBooksData);

// Start the server
const start =  async function() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();