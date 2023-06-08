import * as React from 'react'
import * as styles from './switch.module.css'

type Props = {
  id?: string
  isChecked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Switch({ id, isChecked = false, onChange }: Props) {
  return (
    <label className={styles.root} htmlFor={id}>
      <input
        type="checkbox"
        className={styles.input}
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <span className={styles.label} data-on="B2B" data-off="B2C" />
      <span className={styles.handle} />
    </label>
  )
}
