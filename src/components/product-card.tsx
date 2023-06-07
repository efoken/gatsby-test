import * as React from 'react'
import { useConfig } from '../utils/config-provider'
import * as styles from './product-card.module.css'

type Props = {
  product: Pick<Queries.Product, 'title' | 'priceB2C' | 'image'>
}

export default function ProductCard({ product }: Props) {
  const config = useConfig()

  return (
    <div className={styles.root}>
      <img src={`${product.image}`} alt="" />
      <h2 className={styles.title}>{product.title}</h2>
      {product.priceB2C && (
        <div className={styles.price}>
          {product.priceB2C.toLocaleString(config.locale, {
            style: 'currency',
            currency: config.currency
          })}
        </div>
      )}
    </div>
  )
}
