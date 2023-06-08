import outdent from 'outdent'
import * as React from 'react'
import { PriceMode } from './price-mode-provider'

type Props = {
  initialPriceMode?: PriceMode
}

export default function PriceModeScript({ initialPriceMode = 'b2c' }: Props) {
  const priceMode = ['b2b', 'b2c'].includes(initialPriceMode)
    ? initialPriceMode
    : 'b2c'

  return (
    <script
      key="price-mode-init"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: outdent`
          !(function() { try {
            var mode = localStorage.getItem('price-mode') || '${priceMode}'
            document.documentElement.dataset.priceMode = mode
          } catch (error) {} })()
        `
      }}
    />
  )
}
