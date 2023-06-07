import express from 'express'
import getProducts from './get-products'

const app = express()

app.use((_req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  next()
})

app.get('/api/products/:locale', getProducts)

app.listen(3000)
