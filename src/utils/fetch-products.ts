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

export default async function fetchProducts(config: Config, page = 0) {
  return fetch(
    `http://localhost:8000${config.endpoints.products}?page=${page}`
  ).then((response) => response.json()) as Promise<ProductsResponse>
}
