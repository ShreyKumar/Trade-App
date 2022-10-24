module.exports = {
  tradeValidation: ({ id, ticker, amount, price, executionType, executionDate, userId }) => {
    if (!id || !ticker || !amount || !price || !executionType || !executionDate || !userId) {
      throw new Error('Some fields are missing')
    }
  },

  sanitizeInputs: ({ id, ticker, amount, price, executionType, executionDate, userId }) => {
    let sanitizedOutput = {}
    if (id) {
      sanitizedOutput.id = parseInt(id)
    }

    if (ticker) {
      sanitizedOutput.ticker = ticker
    }

    if (amount) {
      sanitizedOutput.amount = parseInt(amount)
    }

    if (price) {
      sanitizedOutput.price = parseInt(price)
    }

    if (executionType) {
      sanitizedOutput.executionType = executionType
    }

    if (executionDate) {
      sanitizedOutput.executionDate = executionDate
    }

    if (userId) {
      sanitizedOutput.userId = parseInt(userId)
    }

    return sanitizedOutput
  },

  sanitizeSummaryQueryParams: ({ userId, executionDate, executionType }) => {
    let sanitizedQueryParams = {}
    if (userId) {
      sanitizedQueryParams.userId = parseInt(userId)
    }

    if (executionDate) {
      sanitizedQueryParams.executionDate = executionDate
    }

    if (executionType) {
      sanitizedQueryParams.executionType = executionType
    }

    return sanitizedQueryParams
  },

  doesTradeBelongToUser: (trades, tradeId) => {
    return !!trades.find(({ id }) => id === tradeId)
  }
}
