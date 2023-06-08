import type { GatsbySSR } from 'gatsby'
import * as React from 'react'
import ConfigProvider from './src/utils/config-provider'
import PriceModeScript from './src/utils/price-mode-script'
import PriceModeProvider from './src/utils/price-mode-provider'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ConfigProvider>
    <PriceModeProvider>{element}</PriceModeProvider>
  </ConfigProvider>
)

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents
}) => {
  setPreBodyComponents([<PriceModeScript key="price-mode" />])
}
