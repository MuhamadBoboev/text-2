import classes from './Checkbox.module.scss'
import { AllHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CheckboxProps extends AllHTMLAttributes<HTMLInputElement> {
  children: ReactNode
  type?: 'radio' | 'checkbox'
  classNames?: {
    label?: string
    input?: string
    text?: string
    checkbox?: string
  }
}

function Checkbox({
  children,
  classNames,
  className,
  type = 'checkbox',
  ...keys
}: CheckboxProps) {
  return (
    <label className={clsx(classes.Label, classNames?.label)}>
      <input
        type={type}
        className={clsx(classes.Input, className)}
        {...keys}
      />
      <span className={clsx(classes.Text, classNames?.text)}>{children}</span>
      <span className={clsx(classes.Checkbox)} />
    </label>
  )
}

export default Checkbox
