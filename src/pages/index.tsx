import { PageProps, graphql } from 'gatsby'
import * as React from 'react'
import ProductCard from '../components/product-card'
import ProductSlider from '../components/product-slider'
import { useConfig } from '../utils/config-provider'
import fetchProducts from '../utils/fetch-products'
import './global.css'

export default function Home({ data }: PageProps<Queries.HomeQuery>) {
  const config = useConfig()

  const [products, setProducts] = React.useState(data.allProduct)
  const [isLoading, setLoading] = React.useState(false)

  const handleLoadMore = () => {
    setLoading(true)
    fetchProducts(config.endpoints, products.pageInfo.currentPage).then(
      (nextProducts) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          nodes: [...prevProducts.nodes, ...nextProducts.hits],
          pageInfo: {
            ...prevProducts.pageInfo,
            currentPage: nextProducts.page + 1,
            hasNextPage: nextProducts.hasNextPage
          }
        }))
        setLoading(false)
      }
    )
  }

  return (
    <>
      <h1>Products</h1>
      <ProductSlider
        hasMore={products.pageInfo.hasNextPage}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
      >
        {products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductSlider>
    </>
  )
}

export const query = graphql`
  query Home {
    allProduct(limit: 10) {
      nodes {
        id
        title
        priceB2C
        priceB2B
        image
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`
