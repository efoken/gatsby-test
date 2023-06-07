import Config from '../config/type'

export type Product = {
  id: number
  title: string
  priceB2C: number
  priceB2B: number
  image: string
}

export type ProductsResponse = {
  page: number
  totalPages: number
  hpp: number
  hasNextPage: boolean
  hits: Product[]
}

const PORT = process.env.NODE_ENV === 'development' ? 8000 : 9000

export default async function fetchProducts(config: Config, page = 0) {
  return fetch(
    `http://localhost:${PORT}${config.endpoints.products}?page=${page}`
  ).then((response) => response.json()) as Promise<ProductsResponse>
}
