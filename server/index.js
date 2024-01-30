const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { ApolloServer, PubSub } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');
const initializeTags = require('./utils/tagInit');
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB successfully connected");
      initializeTags();
    })
    .catch(err => console.log(err));

const pubsub = new PubSub();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ 
  schema, 
  context: ({ req }) => ({ req, pubsub })
});

async function startServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    });

    useServer({ schema }, wsServer);

    httpServer.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

startServer();
