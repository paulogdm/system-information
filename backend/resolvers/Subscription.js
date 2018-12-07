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
}
