module.exports = {
  time: {
    subscribe(parent, args, ctx) {
      const channel = Math.random().toString(36).substring(2, 15) // random channel name
      setInterval(() => {
        const now = new Date()
        ctx.pubsub.publish(channel, {time: now.toISOString()})
      }, 1000)
      return ctx.pubsub.asyncIterator(channel)
    }
  }
}
