module.exports = {
  getTradesByUser: async (trades, userId) => {
    try {
      const cursor = await trades.find({ userId })
      const results = await cursor.toArray()
      return results
    } catch (error) {
      return error
    }
  },

  getTradeById: async (trades, id) => {
    try {
      const cursor = await trades.find({ id })
      const results = await cursor.toArray()
      return results[0]
    } catch (error) {
      return error
    }
  }
}