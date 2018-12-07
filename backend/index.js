const { GraphQLServer, PubSub } = require('graphql-yoga')
const path = require('path')

const resolvers = require('./resolvers')

const pubsub = new PubSub()
const server = new GraphQLServer({
  resolvers,
  typeDefs: path.join(__dirname, './schema.graphql'),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: {
    pubsub,
  },
})

server.start(
  {
    cors: true,
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`)
  },
)
