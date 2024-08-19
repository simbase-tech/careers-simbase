import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'
import styles from './input.module.scss'
import clsx from 'clsx'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <div className={styles.textField}>
        <span className={styles.textField__icon}>&gt;</span>
        <input
          ref={ref}
          {...otherProps}
          className={clsx(className, styles.textField__input)}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
