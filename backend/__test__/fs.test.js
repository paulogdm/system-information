const { fixtures, graphql, schema, tester } = require('./init')

describe('Validate FS schema', () => {
  const cases = [
    {
      id: 'fs',
      query: `{
        fs {
          fs
          type
          size
          used
          use
          mount
        }
      }`,
      expected: true,
    },
    {
      id: 'blockDevices',
      query: `{
        blockDevices {
          name
          type
          fstype
          mount
          size
          physical
          uuid
          label
          model
          serial
          removable
          protocol
        }
      }`,
      expected: true,
    },
    {
      id: 'fsStats',
      query: `{
        fsStats {
          rx
          wx
          tx
          rx_sec
          wx_sec
          tx_sec
          ms
        }
      }`,
      expected: true,
    },
    {
      id: 'diskIO',
      query: `{
        diskIO {
          rIO
          wIO
          tIO
          rIO_sec
          wIO_sec
          tIO_sec
          ms
        }
      }`,
      expected: true,
    },
  ]

  cases.forEach(({ id, query, expected }) => {
    test(`Should validate the query: ${id}`, () => tester.test(expected, query))
  })
})

describe("Test GraphQL FS's queries", () => {
  test("Should resolve FS's query", async () => {
    const query = `query {
      fs {
        fs
        type
        size
      }
      blockDevices {
        name
        type
        fstype
        size
      }
      fsStats {
        rx
        wx
        tx
      }
      diskIO {
        rIO
        wIO
        tIO
      }
    }`

    const result = await graphql(schema, query)

    expect(result).toEqual({
      data: {
        fs: fixtures.fsSize.map(({ fs, type, size }) => ({ fs, type, size })),
        blockDevices: fixtures.blockDevices.map(
          ({ name, type, fstype, size }) => ({ name, type, fstype, size }),
        ),
        fsStats: {
          rx: fixtures.fsStats.rx,
          wx: fixtures.fsStats.wx,
          tx: fixtures.fsStats.tx,
        },
        diskIO: {
          rIO: fixtures.disksIO.rIO,
          wIO: fixtures.disksIO.wIO,
          tIO: fixtures.disksIO.tIO,
        },
      },
    })
  })
})
