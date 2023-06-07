type ProductsEndpoints = {
  products: string
}

type ProductsResponse = {
  page: number
  totalPages: number
  hpp: number
  hasNextPage: boolean
  hits: Pick<
    Queries.Product,
    'id' | 'title' | 'priceB2C' | 'priceB2B' | 'image'
  >[]
}

export default async function fetchProducts(
  endpoints: ProductsEndpoints,
  page = 0,
  hpp = 10
) {
  return fetch(
    `http://localhost:3000${endpoints.products}?page=${page}&hpp=${hpp}`
  ).then((response) => response.json()) as Promise<ProductsResponse>
}
