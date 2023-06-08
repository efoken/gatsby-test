import * as React from 'react'

export type PriceMode = 'b2b' | 'b2c'

type PriceModeContextType = {
  priceMode: PriceMode
  setPriceMode: (priceMode: PriceMode) => void
}

const PriceModeContext = React.createContext<PriceModeContextType>(
  undefined as any
)

export function usePriceMode() {
  return React.useContext(PriceModeContext)
}

type Props = {
  children: React.ReactNode
}

export default function PriceModeProvider({ children }: Props) {
  const [priceMode, setRawPriceMode] = React.useState<PriceMode>(
    (localStorage.getItem('price-mode') as PriceMode | null) ?? 'b2b'
  )

  const setPriceMode = (nextPriceMode: PriceMode) => {
    setRawPriceMode(nextPriceMode)
    localStorage.setItem('price-mode', nextPriceMode)
    document.documentElement.dataset.priceMode = nextPriceMode
  }

  const context = React.useMemo<PriceModeContextType>(
    () => ({ priceMode, setPriceMode }),
    [priceMode]
  )

  return (
    <PriceModeContext.Provider value={context}>
      {children}
    </PriceModeContext.Provider>
  )
}
