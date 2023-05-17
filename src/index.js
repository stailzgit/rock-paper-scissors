//node_modules
import express from "express";
import { createServer } from "http";
import { expressMiddleware } from "@apollo/server/express4";
import json from "body-parser";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";

//Local
import typeDefs from "./types/index.js";
// const typeDefs = require("./types");
import * as resolvers from "./resolvers/index.js";
import * as models from "./models/index.js";
import authContext from "./middleware/auth.js";
import connectDB from "./config/db.js";

// import express from "express";
// import { createServer } from "http";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws";

connectDB();
const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  context: { models },
  // context: async ({ req }) => ({ token: req.headers.token }),
  csrfPrevention: true,
  cors: {
    origin: "*",
    credentials: true,
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`Server is ready at ${url}`);
// });

await server.start();
app.use("/graphql", cors(), json(), expressMiddleware(server));

const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
