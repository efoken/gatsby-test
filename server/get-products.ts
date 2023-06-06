import productsDE from './products.de-de'
import productsUS from './products.en-us'

export default function getProducts(req: any, res: any) {
  const page = parseInt(req.query.page ?? '0')
  const hpp = parseInt(req.query.hpp ?? '10')
  const locale = req.params.locale

  const products =
    locale === 'de-de' ? productsDE : locale === 'en-us' ? productsUS : []

  const fromSlice = hpp * page
  const toSlice = fromSlice + hpp
  const slice = products.slice(fromSlice, toSlice)
  const hasNextPage = toSlice < products.length

  res.send({
    page: page,
    totalPages: Math.ceil(products.length / hpp),
    hpp: hpp,
    hasNextPage: hasNextPage,
    hits: slice
  })
}
