const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const format = require('date-fns/format')
const parse = require('date-fns/parse')

const FORMAT = 'yyyy-MM-dd HH:mm:ss'

const DateUnix = new GraphQLScalarType({
  name: 'DateUnix',
  description: 'A scalar type for Unix date',
  serialize(value) {
    return format(value, FORMAT, new Date())
  },
  parseValue(value) {
    return parse()
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return format(ast.value, FORMAT, new Date())
        break
      default:
        return null
    }
  },
})

module.exports = DateUnix
