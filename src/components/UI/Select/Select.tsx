import classes from './Select.module.scss'
import {
  AllHTMLAttributes,
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react'
import clsx from 'clsx'
import ErrorIcon from '@assets/icons/error-input.svg'

export interface IOption extends AllHTMLAttributes<HTMLOptionElement> {
  children: ReactNode
  isPlaceholder?: boolean
}

interface SelectProps extends AllHTMLAttributes<HTMLSelectElement> {
  className?: string
  children: ReactNode
  errorMessage?: string
}

export const Select: FC<SelectProps> = forwardRef(
  (
    { className, children, errorMessage, ...keys },
    ref: ForwardedRef<HTMLSelectElement>,
  ) => (
    <div className={classes.SelectWrapper}>
      <select
        ref={ref}
        className={clsx(classes.Select, className)}
        defaultValue=""
        {...keys}
      >
        {children}
      </select>
      {errorMessage && (
        <small className={`${classes.Error}`}>
          <ErrorIcon
            width={14}
            height={14}
          />
          {errorMessage}
        </small>
      )}
    </div>
  ),
)

export const Option: FC<IOption> = forwardRef(
  (
    { isPlaceholder, children, ...keys },
    ref: ForwardedRef<HTMLOptionElement>,
  ) => (
    <option
      ref={ref}
      className={clsx(isPlaceholder && classes.Placeholder)}
      disabled={isPlaceholder}
      value={isPlaceholder ? '' : undefined}
      selected={isPlaceholder ? true : undefined}
      {...keys}
    >
      {children}
    </option>
  ),
)
