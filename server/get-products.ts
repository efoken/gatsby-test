import { FastifyReply, FastifyRequest } from 'fastify'
import productsDE from './products.de-de'
import productsUS from './products.en-us'

export default function getProducts(
  req: FastifyRequest<{
    Params: { locale: string }
    Querystring: { page?: string; hpp?: string }
  }>,
  reply: FastifyReply
) {
  const page = Number.parseInt(req.query.page ?? '0', 10)
  const hpp = Number.parseInt(req.query.hpp ?? '10', 10)
  const { locale } = req.params

  const products =
    locale === 'de-de' ? productsDE : locale === 'en-us' ? productsUS : []

  const fromSlice = hpp * page
  const toSlice = fromSlice + hpp
  const slice = products.slice(fromSlice, toSlice)
  const hasNextPage = toSlice < products.length

  reply.send({
    page,
    totalPages: Math.ceil(products.length / hpp),
    hpp,
    hasNextPage,
    hits: slice
  })
}
