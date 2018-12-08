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

describe('Validate system schema', () => {
  let tester = new EasyGraphQLTester(typeDefs)

  const cases = [
    {
      id: 'osInfo',
      query: `{
        osInfo {
          platform
          distro
          release
          codename
          kernel
          arch
          hostname
          logofile
          serial
          build
        }
      }`,
      expected: true,
    },
    {
      id: 'osVersions',
      query: `{
        osVersions {
          kernel
          openssl
          systemOpenssl
          systemOpensslLib
          node
          v8
          npm
          yarn
          git
          mysql
          redis
          mongodb
          nginx
          php
          docker
          postfix
          postgresql
        }
      }`,
      expected: true,
    },
  ]

  cases.forEach(({ id, query, expected }) => {
    test(`Should validate the query: ${id}`, () => tester.test(expected, query))
  })
})

describe("Test GraphQL os's queries", () => {
  test("Should resolve os's query", async () => {
    const query = `query {
      osInfo {
        platform
        distro
        hostname
      }
      osVersions {
        node
        v8
        npm
      }
    }`

    const result = await graphql(schema, query)

    expect(result).toEqual({
      data: {
        osInfo: {
          platform: fixtures.osInfo.platform,
          distro: fixtures.osInfo.distro,
          hostname: fixtures.osInfo.hostname,
        },
        osVersions: {
          node: fixtures.versions.node,
          v8: fixtures.versions.v8,
          npm: fixtures.versions.npm,
        },
      },
    })
  })
})
