import type { GatsbySSR } from 'gatsby'
import * as React from 'react'
import ConfigProvider from './src/utils/config-provider'

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
  <ConfigProvider>{element}</ConfigProvider>
)
