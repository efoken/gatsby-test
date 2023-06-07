import type { GatsbyBrowser } from 'gatsby'
import * as React from 'react'
import ConfigProvider from './src/utils/config-provider'

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => <ConfigProvider>{element}</ConfigProvider>
