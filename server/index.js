const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const { typeDefs, resolvers } = require('./graphql/schema');
const initializeTags = require('./utils/tagInit');
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// initialize express application
const app = express();
const port = process.env.PORT || 5000;

// apply middleware for cors and json parsing
app.use(cors());
app.use(express.json());

// connect to mongodb using Mongoose
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB successfully connected");
      initializeTags(); // initialize tags if necessary
    })
    .catch(err => console.log(err));

// initialize apollo pubSub for subs
const pubsub = new PubSub();

// create an executable GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// initialize apollo server with the schema and context
const apolloServer = new ApolloServer({ 
  schema, 
  context: ({ req }) => ({ req, pubsub })
});

async function startServer() {
    // start apollo server
    await apolloServer.start();
    apolloServer.applyMiddleware({ app }); // apply apollo middleware to Express app

    // create an HTTP server to run alongside the websocket server
    const httpServer = createServer(app);

    // set up webSocket server for handling graphql subscriptions
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    });

    // use graphql-ws library to attach the schema to the websocket server
    useServer({ schema }, wsServer);

    // start listening on the specified port
    httpServer.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

// start the server
startServer();