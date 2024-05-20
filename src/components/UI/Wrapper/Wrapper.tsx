import classes from './Wrapper.module.scss'
import { FC, forwardRef } from 'react'

interface WrapperProps {
  tagName?: keyof JSX.IntrinsicElements
  className?: string
}

const Wrapper: FC<WrapperProps & any> = forwardRef(
  ({ tagName: Wrapper = 'div', children, className, ...rest }, ref: any) => (
    <Wrapper
      ref={ref}
      className={`${classes.Wrapper} ${className || ''}`}
      {...rest}
    >
      {children}
    </Wrapper>
  ),
)

export default Wrapper
