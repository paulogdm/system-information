const fixtures = require('./fixtures.json')

const genRandom = (min = 0, max = 100) => Math.random() * (max - min)

module.exports = {
  time() {
    return fixtures.time
  },
  system() {
    return Promise.resolve(fixtures.system)
  },
  bios() {
    return Promise.resolve(fixtures.bios)
  },
  baseboard() {
    return Promise.resolve(fixtures.baseboard)
  },
  cpu() {
    return Promise.resolve(fixtures.cpu)
  },
  cpuCache() {
    return Promise.resolve(fixtures.cpuCache)
  },
  cpuCurrentspeed() {
    return Promise.resolve(fixtures.cpuCurrentspeed)
  },
  cpuTemperature() {
    return Promise.resolve(fixtures.cpuTemperature)
  },
  mem() {
    return Promise.resolve(fixtures.mem)
  },
  memLayout() {
    return Promise.resolve(fixtures.memLayout)
  },
  diskLayout() {
    return Promise.resolve(fixtures.diskLayout)
  },
  battery() {
    return Promise.resolve(fixtures.battery)
  },
  graphics() {
    return Promise.resolve(fixtures.graphics)
  },
  osInfo() {
    return Promise.resolve(fixtures.osInfo)
  },
  versions() {
    return Promise.resolve(fixtures.versions)
  },
  fsSize() {
    return Promise.resolve(fixtures.fsSize)
  },
  blockDevices() {
    return Promise.resolve(fixtures.blockDevices)
  },
  fsStats() {
    return Promise.resolve(fixtures.fsStats)
  },
  disksIO() {
    return Promise.resolve(fixtures.disksIO)
  },
  networkInterfaces() {
    return Promise.resolve(fixtures.networkInterfaces)
  },
  networkInterfaceDefault() {
    return Promise.resolve(fixtures.networkInterfaceDefault)
  },
  networkStats(iface = 'eth0') {
    return Promise.resolve({ ...fixtures.networkStats, iface })
  },
  networkConnections() {
    return Promise.resolve(fixtures.networkConnections)
  },
  inetChecksite(url) {
    return Promise.resolve({
      url,
      ok: 'true',
      status: 200,
      ms: 100,
    })
  },
  inetLatency(host) {
    return Promise.resolve(host.length)
  },
  currentLoad() {
    const max = 2 ** 64
    return Promise.resolve({
      avgload: genRandom(),
      currentload: genRandom(),
      currentload_user: genRandom(),
      currentload_system: genRandom(),
      currentload_nice: genRandom(),
      currentload_idle: genRandom(),
      currentload_irq: genRandom(),
      raw_currentload: genRandom(0, max),
      raw_currentload_user: genRandom(0, max),
      raw_currentload_system: genRandom(0, max),
      raw_currentload_nice: genRandom(0, max),
      raw_currentload_idle: genRandom(0, max),
      raw_currentload_irq: genRandom(0, max),
      cpus: [0, 1, 2, 3].map(() => ({
        load: genRandom(),
        load_user: genRandom(),
        load_system: genRandom(),
        load_nice: genRandom(),
        load_idle: genRandom(),
        load_irq: genRandom(),
        raw_load: genRandom(0, max),
        raw_load_user: genRandom(0, max),
        raw_load_system: genRandom(0, max),
        raw_load_nice: genRandom(0, max),
        raw_load_idle: genRandom(0, max),
        raw_load_irq: genRandom(0, max),
      })),
    })
  },
  fullLoad() {
    return Promise.resolve(genRandom())
  },
  processes() {
    const all = Math.floor(genRandom(1000, 10))
    const sleeping = Math.floor(genRandom(500, 20))
    const blocked = Math.floor(genRandom(20, 10))
    const unknown = Math.floor(genRandom(10, 3))
    const running = all - sleeping - blocked - unknown
    const min = 2 ** 8
    const max = 2 ** 32
    return Promise.resolve({
      all,
      running,
      blocked,
      sleeping,
      unknown,
      list: [
        {
          pid: 1,
          parentPid: 0,
          name: 'init',
          pcpu: genRandom(),
          pcpuu: genRandom(),
          pcpus: genRandom(),
          pmem: genRandom(),
          priority: 19,
          mem_vsz: genRandom(min, max),
          mem_rss: genRandom(min, max),
          nice: 0,
          started: '2012-12-24 05:34:17',
          state: 'sleeping',
          tty: '',
          user: 'root',
          command: '/sbin/init',
        },
      ],
    })
  },
  processLoad(proc) {
    return Promise.resolve({
      proc,
      pid: proc.length,
      pids: [proc.length, proc.length + 1, proc.length + 2],
      cpu: genRandom(),
      mem: genRandom(),
    })
  },
  services(service) {
    const services = service.split(/,\s*/)
    return service.map(srv => ({
      name: srv,
      running: true,
      startmode: '',
      pids: [String.valueOf(srv.length)],
      pcpu: genRandom(),
      pmem: genRandom(),
    }))
  },
}
