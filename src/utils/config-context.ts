import * as React from 'react'
import Config from '../config/type'

const ConfigContext = React.createContext<Config>(undefined as any)

export function useConfig() {
  return React.useContext(ConfigContext)
}

export default ConfigContext
