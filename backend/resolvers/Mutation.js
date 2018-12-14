const si = require('systeminformation')

module.exports = {
  async checkSite(parent, { url }) {
    return si.inetChecksite(url)
  },
  async latencyHost(parent, { host }) {
    return si.inetLatency(host)
  },
}
