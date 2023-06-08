import * as React from 'react'
import { useConfig } from '../utils/config-provider'
import * as styles from './price.module.css'

type Props = {
  className?: string
  value: {
    b2c?: number
    b2b?: number
  }
}

export default function Price({ className, value }: Props) {
  const config = useConfig()

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {value.b2c && (
        <span className={styles.b2c}>
          {value.b2c.toLocaleString(config.locale, {
            style: 'currency',
            currency: config.currency
          })}
        </span>
      )}
      {value.b2b && (
        <span className={styles.b2b}>
          {value.b2b.toLocaleString(config.locale, {
            style: 'currency',
            currency: config.currency
          })}
        </span>
      )}
    </div>
  )
}
