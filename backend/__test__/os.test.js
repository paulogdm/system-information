const { fixtures, graphql, schema, tester } = require('./init')

describe('Validate OS schema', () => {
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

describe("Test GraphQL OS's queries", () => {
  test("Should resolve OS's query", async () => {
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
