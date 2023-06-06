import type { GatsbyConfig } from 'gatsby'
import getProducts from './server/get-products'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'eike-task',
    siteUrl: 'https://www.yourdomain.tld'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [],
  developMiddleware: (app) => {
    app.get('/api/products/:locale', getProducts)
  }
}

export default config
