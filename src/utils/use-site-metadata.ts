import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          config {
            locale
            currency
            endpoints {
              products
            }
          }
        }
      }
    }
  `)
  return data.site.siteMetadata
}
