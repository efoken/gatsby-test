import fastify from 'fastify'
import getProducts from './get-products'

const server = fastify({ logger: true })

server.addHook('preHandler', (_req, reply, done) => {
  reply.header('Access-Control-Allow-Origin', ['*'])
  done()
})

server.get('/api/products/:locale', getProducts)

server.listen({ port: 3000 })
