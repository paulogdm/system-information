const { fixtures, graphql, schema, tester } = require('./init')

describe('Validate network schema', () => {
  const cases = [
    {
      id: 'netIfaces',
      query: `{
        netIfaces {
          iface
          ip4
          ip6
          mac
          internal
        }
      }`,
      expected: true,
    },
    {
      id: 'netStats',
      query: `{
        netStats {
          iface
          operstate
          rx
          tx
          rx_sec
          tx_sec
          ms
        }
      }`,
      expected: true,
    },
    {
      id: 'netConns',
      query: `{
        netConns {
          protocol
          localaddress
          localport
          peeraddress
          peerport
          state
        }
      }`,
      expected: true,
    },
    {
      id: 'checkSite',
      query: `mutation check {
        checkSite {
          url
          ok
          status
          ms
        }
      }`,
      variables: {
        url: 'https://www.google.com/',
      },
      expected: true,
    },
    {
      id: 'latencyHost',
      query: `mutation {
        latencyHost
      }`,
      variables: {
        host: '192.168.0.1',
      },
      expected: true,
    },
  ]

  cases.forEach(({ id, query, variables, expected }) => {
    test(`Should validate the query: ${id}`, () =>
      tester.test(expected, query, variables))
  })
})

describe("Test GraphQL network's queries", () => {
  test("Should resolve network's query", async () => {
    const query = `query {
      netIfaces {
        iface
        mac
        internal
      }
      netIfaceDefault
      netStats(iface: "wlan0") {
        iface
        operstate
      }
      netConns {
        protocol
        peeraddress
        state
      }
    }`

    const result = await graphql(schema, query)

    expect(result).toEqual({
      data: {
        netIfaces: fixtures.networkInterfaces.map(
          ({ iface, mac, internal }) => ({ iface, mac, internal }),
        ),
        netIfaceDefault: fixtures.networkInterfaceDefault,
        netStats: {
          iface: 'wlan0',
          operstate: fixtures.networkStats.operstate,
        },
        netConns: fixtures.networkConnections.map(
          ({ protocol, peeraddress, state }) => ({
            protocol,
            peeraddress,
            state,
          }),
        ),
      },
    })
  })
})
