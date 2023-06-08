import * as React from 'react'
import * as styles from './stack.module.css'

type Props = {
  children?: React.ReactNode
}

export default function Stack({ children }: Props) {
  return <div className={styles.root}>{children}</div>
}
