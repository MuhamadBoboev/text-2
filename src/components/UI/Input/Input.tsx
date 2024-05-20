import classes from './Input.module.scss'
import { AllHTMLAttributes, FC, ForwardedRef, forwardRef, useId } from 'react'
import ErrorIcon from '@assets/icons/error-input.svg'

interface InputProps extends AllHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
  className?: string
  classNames?: {
    group?: string
    wrapper?: string
    label?: string
    error?: string
  }
  hideLabel?: boolean
}

const Input: FC<InputProps> = forwardRef(
  (
    { className, label, errorMessage, classNames, hideLabel = true, ...keys },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()

    return (
      <div className={`${classes.Group} ${classNames?.group}`}>
        <label
          className={`${classes.Label} ${hideLabel && classes.LabelHidden} ${classNames?.label}`}
          htmlFor={id}
        >
          {label}
        </label>
        <div className={`${classes.InputWrap} ${classNames?.wrapper}`}>
          <input
            ref={ref}
            className={`${classes.Input} ${errorMessage ? classes.ErrorInput : ''} ${className || ''}`}
            {...keys}
          />
          <span className={classes.Line} />
        </div>
        {errorMessage && (
          <small className={`${classes.Error} ${classNames?.group}`}>
            <ErrorIcon
              width={14}
              height={14}
            />
            {errorMessage}
          </small>
        )}
      </div>
    )
  },
)

export default Input
