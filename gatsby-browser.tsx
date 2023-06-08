import type { GatsbyBrowser } from 'gatsby'
import * as React from 'react'
import ConfigProvider from './src/utils/config-provider'
import PriceModeProvider from './src/utils/price-mode-provider'

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => (
  <ConfigProvider>
    <PriceModeProvider>{element}</PriceModeProvider>
  </ConfigProvider>
)
