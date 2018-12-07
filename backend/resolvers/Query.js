const si = require('systeminformation')

module.exports = {
  time() {
    return si.time()
  },

  async system() {
    return await si.system()
  },

  async bios() {
    return await si.bios()
  },

  async baseboard() {
    return await si.baseboard()
  },

  async cpu() {
    return await si.cpu()
  },

  async cpuCache() {
    return await si.cpuCache()
  },

  async cpuSpeed() {
    return await si.cpuCurrentspeed()
  },

  async cpuTemperature() {
    return await si.cpuTemperature()
  },

  async memory() {
    return await si.mem()
  },

  async memoryLayout() {
    return await si.memLayout()
  },

  async diskLayout() {
    return await si.diskLayout()
  },

  async battery() {
    return await si.battery()
  },

  async graphics() {
    return await si.graphics()
  },
}
