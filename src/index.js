const { ApolloServer } = require("@apollo/server");
const connectDB = require("./config/db");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const models = require("./models");
const authContext = require("./middleware/auth");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

(async function () {
  const { createServer } = require("http");
  const {
    ApolloServerPluginDrainHttpServer,
  } = require("@apollo/server/plugin/drainHttpServer");
  const { makeExecutableSchema } = require("@graphql-tools/schema");

  const { WebSocketServer } = require("ws");
  const { useServer } = require("graphql-ws/lib/use/ws");
  const { expressMiddleware } = require("@apollo/server/express4");

  connectDB();

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  console.log("models", models);

  const server = new ApolloServer({
    schema,
    // context: { models },
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
  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server run http://localhost:${PORT}/graphql`);
  });
})();
