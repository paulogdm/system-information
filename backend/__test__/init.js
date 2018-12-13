const EasyGraphQLTester = require('easygraphql-tester')
const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const fs = require('fs')
const path = require('path')

const resolvers = require('../resolvers')
const fixtures = require('../__mocks__/fixtures.json')

const typeDefs = fs.readFileSync(
  path.join(__dirname, '..', 'schema.graphql'),
  'utf8',
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = {
  fixtures,
  graphql,
  schema,
  get tester() {
    return new EasyGraphQLTester(typeDefs)
  },
}
