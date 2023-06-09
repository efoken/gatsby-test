import type { GatsbyConfig } from 'gatsby'
import deDE from './src/config/de-de'
import enUS from './src/config/en-us'

const config: GatsbyConfig = {
  siteMetadata: {
    ...(process.env.LOCALE === 'de-de' ? deDE : enUS),
    title: 'eike-task',
    siteUrl: 'http://localhost'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-fastify',
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
  ]
}

export default config
