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

  async osInfo() {
    return await si.osInfo()
  },

  async osVersions() {
    return await si.versions()
  },

  async fs() {
    return await si.fsSize()
  },

  async blockDevices() {
    return await si.blockDevices()
  },

  async fsStats() {
    return await si.fsStats()
  },

  async diskIO() {
    return await si.disksIO()
  },

  async netIfaces() {
    return await si.networkInterfaces()
  },

  async netIfaceDefault() {
    return await si.networkInterfaceDefault()
  },

  async netStats(parent, args) {
    return await si.networkStats(args.iface)
  },

  async netConns() {
    return await si.networkConnections()
  },
}
