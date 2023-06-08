import * as React from 'react'
import Price from './price'
import * as styles from './product-card.module.css'

type Props = {
  product: Pick<Queries.Product, 'title' | 'priceB2C' | 'priceB2B' | 'image'>
}

export default function ProductCard({ product }: Props) {
  return (
    <div className={styles.root}>
      <img src={`${product.image}`} alt="" />
      <h2 className={styles.title}>{product.title}</h2>
      <Price
        className={styles.price}
        value={{
          b2b: product.priceB2B ?? undefined,
          b2c: product.priceB2C ?? undefined
        }}
      />
    </div>
  )
}
