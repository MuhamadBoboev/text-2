import classes from './Radio.module.scss'
import { AllHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface RadioButtonProps extends AllHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  classNames?: {
    label?: string
    input?: string
    text?: string
    radio?: string
  }
}

function Radio({ children, classNames, className, ...keys }: RadioButtonProps) {
  return (
    <label
      tabIndex={0}
      className={clsx(classes.Label, className)}
    >
      <input
        type="radio"
        {...keys}
        className={clsx(classes.Input, classNames?.input)}
      />
      <span className={clsx(classes.Text, classNames?.text)}>{children}</span>
      <span className={clsx(classes.Radio, classNames?.radio)} />
    </label>
  )
}

export default Radio
