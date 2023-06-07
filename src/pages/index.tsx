import { GetServerDataProps, GetServerDataReturn, PageProps } from 'gatsby'
import * as React from 'react'
import ProductCard from '../components/product-card'
import ProductSlider from '../components/product-slider'
import Config from '../config/type'
import ConfigContext from '../utils/config-context'
import fetchProducts, { ProductsResponse } from '../utils/fetch-products'
import './global.css'

type PageContextProps = {
  config: Config
}

type ServerDataProps = {
  products: ProductsResponse
}

export default function Home({
  pageContext,
  serverData
}: PageProps<object, PageContextProps, unknown, ServerDataProps>) {
  const [products, setProducts] = React.useState(serverData.products)
  const [isLoading, setLoading] = React.useState(false)

  const handleLoadMore = () => {
    setLoading(true)
    fetchProducts(pageContext.config, products.page + 1).then(
      (nextProducts) => {
        setProducts((prevProducts) => ({
          ...nextProducts,
          hits: [...prevProducts.hits, ...nextProducts.hits]
        }))
        setLoading(false)
      }
    )
  }

  return (
    <ConfigContext.Provider value={pageContext.config}>
      <h1>Products</h1>
      <ProductSlider
        hasMore={products.hasNextPage}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
      >
        {products.hits.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductSlider>
    </ConfigContext.Provider>
  )
}

export async function getServerData({
  pageContext
}: GetServerDataProps): GetServerDataReturn<ServerDataProps> {
  const products = await fetchProducts(pageContext.config as Config)
  return {
    props: { products }
  }
}
