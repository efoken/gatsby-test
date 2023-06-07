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
  plugins: [
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: [
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com'
        ],
        web: [
          {
            name: 'Roboto',
            file: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          }
        ]
      }
    }
  ],
  developMiddleware: (app) => {
    app.get('/api/products/:locale', getProducts)
  }
}

export default config
