import { GetServerDataReturn, PageProps } from 'gatsby'
import * as React from 'react'
import ProductCard from '../components/product-card'
import ProductSlider from '../components/product-slider'
import ConfigContext from '../utils/config-context'
import fetchProducts, { ProductsResponse } from '../utils/fetch-products'
import getConfig from '../utils/get-config'
import useSiteMetadata from '../utils/use-site-metadata'
import './global.css'

type ServerDataProps = {
  products: ProductsResponse
}

export default function Home({
  serverData
}: PageProps<object, object, unknown, ServerDataProps>) {
  const siteMetadata = useSiteMetadata()

  const [products, setProducts] = React.useState(serverData.products)
  const [isLoading, setLoading] = React.useState(false)

  const handleLoadMore = () => {
    setLoading(true)
    fetchProducts(siteMetadata.config, products.page + 1).then(
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
    <ConfigContext.Provider value={siteMetadata.config}>
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

export async function getServerData(): GetServerDataReturn<ServerDataProps> {
  const products = await fetchProducts(getConfig())
  return {
    props: { products }
  }
}
