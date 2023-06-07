import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import Config from '../config/type'

const ConfigContext = React.createContext<Config>(undefined as any)

export function useConfig() {
  return React.useContext(ConfigContext)
}

type Props = {
  children: React.ReactNode
}

export default function ConfigProvider({ children }: Props) {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          locale
          currency
          endpoints {
            products
          }
        }
      }
    }
  `)

  return (
    <ConfigContext.Provider value={query.site.siteMetadata}>
      {children}
    </ConfigContext.Provider>
  )
}
