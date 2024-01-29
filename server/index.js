const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

startServer();
