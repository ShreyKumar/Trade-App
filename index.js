const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { MongoClient } = require('mongodb')
const { tradeValidation, sanitizeInputs, doesTradeBelongToUser, sanitizeSummaryQueryParams } = require('./utils')
const { getTradesByUser, getTradeById } = require('./controllers')

const CONNECTION_URI = 'mongodb://localhost:27017'
const client = new MongoClient(CONNECTION_URI)

app.use(bodyParser.json())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.get('/', (req, res) => {
  res.send({ status: 'ok' }).status(200)
})

app.get('/summary', async (req, res) => {
  try {
    await client.connect()
    const cursor = await client.db('purefacts').collection('Trade').find(sanitizeSummaryQueryParams(req.query))

    const results = await cursor.toArray()
    return res.send(results).status(200)
  } catch (error) {
    console.error(error)
    return res.send(error).status(500)
  } finally {
    setTimeout(() => {client.close()}, 1500)
  }
})

app.get('/trades', async (req, res) => {
  try {
    const { id } = req.query

    await client.connect()
    const cursor = await client.db('purefacts').collection('Trade').find( id ? { id: parseInt(id) } : null)

    const results = await cursor.toArray()
    return res.send(results).status(200)
  } catch (error) {
    console.error(error)
    return res.send(error).status(500)
  } finally {
    setTimeout(() => {client.close()}, 1500)
  }
})

app.post('/trades', async (req, res) => {
  try {
    tradeValidation(req.body)

    await client.connect()

    const newTrade = sanitizeInputs(req.body)

    const insertAcknowledgement = await client.db('purefacts').collection('Trade').insertOne(newTrade)
    return res.send(insertAcknowledgement).status(200)
  } catch (error) {
    return res.send(error.message).status(500)
  } finally {
    setTimeout(() => {client.close()}, 1500)
  }
})

app.put('/trades/:id', async (req, res) => {
  try {
    const { id } = req.params

    await client.connect()
    const newTrade = sanitizeInputs(req.body)
    const tradeCollection = await client.db('purefacts').collection('Trade')
    const userId = parseInt(req.headers['user-id'])

    // Cannot update a trade if user does not have permission
    const tradesForThisUser = await getTradesByUser(tradeCollection, userId)
    if (!doesTradeBelongToUser(tradesForThisUser, parseInt(id))) {
      throw new Error('Trade does not belong to user!')
    }

    // Execution Date is in the past, so not allowed to update the Trade
    const currentTrade = await getTradeById(tradeCollection, parseInt(id))
    if (new Date(parseInt(currentTrade.executionDate)) < new Date()) {
      throw new Error('Execution Date is in the past!')
    }

    const putAcknowledgement = await tradeCollection.findOneAndUpdate({ id: parseInt(id) }, { $set: newTrade }, { returnDocument: true })
    return res.send(putAcknowledgement).status(200)
  } catch (error) {
    return res.send(error.message).status(500)
  } finally {
    setTimeout(() => {client.close()}, 1500)
  }
})

app.delete('/trades/:id', async (req, res) => {
  try {
    const { id } = req.params

    await client.connect()
    const userId = parseInt(req.headers['user-id'])
    const tradeCollection = await client.db('purefacts').collection('Trade')

    // Cannot update a trade if user does not have permission
    const tradesForThisUser = await getTradesByUser(tradeCollection, userId)
    if (!doesTradeBelongToUser(tradesForThisUser, parseInt(id))) {
      throw new Error('Trade does not belong to user!')
    }

    // Execution Date is in the past, so not allowed to update the Trade
    const currentTrade = await getTradeById(tradeCollection, parseInt(id))
    if (new Date(parseInt(currentTrade.executionDate)) < new Date()) {
      throw new Error('Execution Date is in the past!')
    }

    const deleteAcknowledgement = await tradeCollection.findOneAndDelete({ id: parseInt(id) })
    return res.send(deleteAcknowledgement).status(200)
  } catch (error) {
    return res.send(error.message).status(500)
  } finally {
    setTimeout(() => {client.close()}, 1500)
  }
})

app.listen(3001, () => console.log("Listening on Port 3001"))
