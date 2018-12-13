const { fixtures, graphql, schema, tester } = require('./init')

describe('Validate system schema', () => {
  const cases = [
    {
      id: 'time',
      query: `{
        time {
          current
          uptime
          timezone
          timezoneName
        }
      }`,
      expected: true,
    },
    {
      id: 'system',
      query: `{
        system {
          manufacturer
          model
          version
          serial
          uuid
          sku
        }
      }`,
      expected: true,
    },
    {
      id: 'bios',
      query: `{
        bios {
          vendor
          version
          releaseDate
          revision
        }
      }`,
      expected: true,
    },
    {
      id: 'baseboard',
      query: `{
        baseboard {
          manufacturer
          model
          version
          serial
          assetTag
        }
      }`,
      expected: true,
    },
    {
      id: 'cpu',
      query: `{
        cpu {
          manufacturer
          brand
          speed
          speedmin
          speedmax
          cores
          vendor
          family
          model
          stepping
          revision
          voltage
          cache {
            l1d
            l1i
            l2
            l3
          }
        }
      }`,
      expected: true,
    },
    {
      id: 'cpuCache',
      query: `{
        cpuCache {
          l1d
          l1i
          l2
          l3
        }
      }`,
      expected: true,
    },
    {
      id: 'cpuSpeed',
      query: `{
        cpuSpeed {
          avg
          min
          max
          cores
        }
      }`,
      expected: true,
    },
    {
      id: 'cpuTemperature',
      query: `{
        cpuTemperature {
          main
          cores
          max
        }
      }`,
      expected: true,
    },
    {
      id: 'memory',
      query: `{
        memory {
          total
          free
          used
          active
          buffcache
          available
          swaptotal
          swapused
          swapfree
        }
      }`,
      expected: true,
    },
    {
      id: 'memoryLayout',
      query: `{
        memoryLayout {
          size
          bank
          type
          clockSpeed
          formFactor
          manufacturer
          partNum
          serialNum
          voltageConfigured
          voltageMin
          voltageMax
        }
      }`,
      expected: true,
    },
    {
      id: 'diskLayout',
      query: `{
        diskLayout {
          type
          name
          vendor
          firmwareRevision
          serialNum
          size
          smartStatus
        }
      }`,
      expected: true,
    },
    {
      id: 'battery',
      query: `{
        battery {
          hasbattery
          cyclecount
          ischarging
          maxcapacity
          currentcapacity
          percent
          timeremaining
          acconnected
          type
          model
          manufacturer
          serial
        }
      }`,
      expected: true,
    },
    {
      id: 'graphics',
      query: `{
        graphics {
          controllers {
            model
            vendor
            bus
            vram
            vramDynamic
          }
          displays {
            model
            main
            builtin
            connection
            resolutionx
            resolutiony
            pixeldepth
            sizex
            sizey
          }
        }
      }`,
      expected: true,
    },
  ]

  cases.forEach(({ id, query, expected }) => {
    test(`Should validate the query: ${id}`, () => tester.test(expected, query))
  })
})

describe("Test GraphQL system's queries", () => {
  test('Should resolve dashboard query', async () => {
    const query = `query {
      time {
        current
        uptime
        timezone
      }
      system {
        manufacturer
        model
        version
      }
      bios {
        vendor
        version
      }
      baseboard {
        manufacturer
        model
        version
      }
      cpu {
        manufacturer
        brand
      }
      cpuCache { l1d }
      cpuSpeed { cores }
      cpuTemperature { main }
      memory {
        total
        free
        used
        active
      }
      memoryLayout {
        size
        bank
        type
      }
      diskLayout {
        type
        name
      }
      battery {
        hasbattery
        acconnected
      }
      graphics {
        controllers {
          model
          vendor
        }
        displays {
          connection
          resolutionx
          resolutiony
        }
      }
    }`

    const result = await graphql(schema, query)

    expect(result).toEqual({
      data: {
        time: {
          current: fixtures.time.current,
          uptime: fixtures.time.uptime,
          timezone: fixtures.time.timezone,
        },
        system: {
          manufacturer: fixtures.system.manufacturer,
          model: fixtures.system.model,
          version: fixtures.system.version,
        },
        bios: { vendor: fixtures.bios.vendor, version: fixtures.bios.version },
        baseboard: {
          manufacturer: fixtures.baseboard.manufacturer,
          model: fixtures.baseboard.model,
          version: fixtures.baseboard.version,
        },
        cpu: {
          manufacturer: fixtures.cpu.manufacturer,
          brand: fixtures.cpu.brand,
        },
        cpuCache: { l1d: fixtures.cpuCache.l1d },
        cpuSpeed: { cores: fixtures.cpuCurrentspeed.cores },
        cpuTemperature: { main: fixtures.cpuTemperature.main },
        memory: {
          total: fixtures.mem.total,
          free: fixtures.mem.free,
          used: fixtures.mem.used,
          active: fixtures.mem.active,
        },
        memoryLayout: fixtures.memLayout.map(({ size, bank, type }) => ({
          size,
          bank,
          type,
        })),
        diskLayout: fixtures.diskLayout.map(({ type, name }) => ({
          type,
          name,
        })),
        battery: {
          hasbattery: fixtures.battery.hasbattery,
          acconnected: fixtures.battery.acconnected,
        },
        graphics: {
          controllers: fixtures.graphics.controllers.map(
            ({ model, vendor }) => ({ model, vendor }),
          ),
          displays: fixtures.graphics.displays.map(
            ({ connection, resolutionx, resolutiony }) => ({
              connection,
              resolutionx,
              resolutiony,
            }),
          ),
        },
      },
    })
  })
})
