const si = require('systeminformation')

const INTERVAL = 1000

module.exports = {
  time: {
    subscribe(parent, args, ctx) {
      // const channel = Math.random().toString(36).substring(2, 15) // random channel name
      const channel = 'CURRENT_TIME_CHANNEL'

      setInterval(() => {
        const time = si.time()
        ctx.pubsub.publish(channel, { time })
      }, INTERVAL)

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  cpuSpeed: {
    subscribe(parent, args, ctx) {
      const channel = 'CPU_CURRENT_SPEED_CHANNEL'

      setInterval(
        () =>
          si
            .cpuCurrentspeed()
            .then(cpuSpeed => ctx.pubsub.publish(channel, { cpuSpeed }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  cpuTemperature: {
    subscribe(parent, args, ctx) {
      const channel = 'CPU_TEMPERATURE_CHANNEL'

      setInterval(
        () =>
          si
            .cpuTemperature()
            .then(cpuTemperature =>
              ctx.pubsub.publish(channel, { cpuTemperature }),
            )
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  memory: {
    subscribe(parent, args, ctx) {
      const channel = 'MEMORY_CHANNEL'

      setInterval(
        () =>
          si
            .mem()
            .then(memory => ctx.pubsub.publish(channel, { memory }))
            .catch(console.error),
        1000,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  battery: {
    subscribe(parent, args, ctx) {
      const channel = 'BATTERY_CHANNEL'

      setInterval(
        () =>
          si
            .battery()
            .then(battery => ctx.pubsub.publish(channel, { battery }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  fsStats: {
    subscribe(parent, args, ctx) {
      const channel = 'FS_STATS_CHANNEL'

      setInterval(
        () =>
          si
            .fsStats()
            .then(fsStats => ctx.pubsub.publish(channel, { fsStats }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  diskIO: {
    subscribe(parent, args, ctx) {
      const channel = 'DISK_IO_CHANNEL'

      setInterval(
        () =>
          si
            .disksIO()
            .then(disksIO => ctx.pubsub.publish(channel, { disksIO }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  netStats: {
    subscribe(parent, args, ctx) {
      const { iface } = args
      const channel = `NETWORK_STATS_${iface}`

      setInterval(
        () =>
          si
            .networkStats(iface)
            .then(networkStats => ctx.pubsub.publish(channel, { networkStats }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  cpuLoad: {
    subscribe(parent, args, ctx) {
      const channel = 'CPU_LOAD'

      setInterval(
        () =>
          si
            .currentLoad()
            .then(cpuLoad => ctx.pubsub.publish(channel, { cpuLoad }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  load: {
    subscribe(parent, args, ctx) {
      const channel = 'LOAD'

      setInterval(
        () =>
          si
            .fullLoad()
            .then(load => ctx.pubsub.publish(channel, { load }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  processes: {
    subscribe(parent, args, ctx) {
      const channel = 'PROCESSES'

      setInterval(
        () =>
          si
            .processes()
            .then(processes => ctx.pubsub.publish(channel, { processes }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  processLoad: {
    subscribe(parent, args, ctx) {
      const { process: proc } = args
      const channel = `PROCESS_${proc}`

      setInterval(
        () =>
          si
            .processLoad(proc)
            .then(processLoad => ctx.pubsub.publish(channel, { processLoad }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },

  serviceLoad: {
    subscribe(parent, args, ctx) {
      const { service } = args
      const channel = `PROCESS_${service}`

      setInterval(
        () =>
          si
            .services(service)
            .then(serviceLoad => ctx.pubsub.publish(channel, { serviceLoad }))
            .catch(console.error),
        INTERVAL,
      )

      return ctx.pubsub.asyncIterator(channel)
    },
  },
}
