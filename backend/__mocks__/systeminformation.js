const fixtures = require('./fixtures.json')

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
}
