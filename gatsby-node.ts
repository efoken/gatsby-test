import type { GatsbyNode } from 'gatsby'
import * as crypto from 'node:crypto'
import deDE from './src/config/de-de'
import enUS from './src/config/en-us'
import fetchProducts from './src/utils/fetch-products'

const config = process.env.LOCALE === 'de-de' ? deDE : enUS

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({
  actions,
  page
}) => {
  actions.createPage({
    ...page,
    context: {
      ...page.context,
      config
    }
  })
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions }) => {
  const products = await fetchProducts(config.endpoints, 0, -1)

  for (const product of products.hits) {
    actions.createNode({
      id: `${product.id}`,
      internal: {
        type: 'Product',
        content: JSON.stringify(product),
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(product))
          .digest('hex')
      },
      title: product.title,
      priceB2C: product.priceB2C,
      priceB2B: product.priceB2B,
      image: product.image
    })
  }
}
