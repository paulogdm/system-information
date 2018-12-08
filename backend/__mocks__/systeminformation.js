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
}