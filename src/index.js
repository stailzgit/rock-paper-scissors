const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/db");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const models = require("./models");
const authContext = require("./middleware/auth");
// import { createServer } from "http";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws";
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, authContext },
  csrfPrevention: true,
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
