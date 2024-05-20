import classes from './Loader.module.scss'
import Spinner from '@ui/spinners/Spinner/Spinner'
import { AllHTMLAttributes } from 'react'
import { Transition } from 'react-transition-group'
import Logo from '@assets/img/logo-big.svg'

interface LoaderProps extends AllHTMLAttributes<HTMLDivElement> {
  isLoading: boolean
}

function Loader({ isLoading, ...keys }: LoaderProps) {
  const transition: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  return (
    <Transition
      in={isLoading}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          style={{
            ...transition[state],
          }}
          className={classes.Loader}
          {...keys}
        >
          <Logo
            className={classes.Logo}
            src="/assets/img/logo-big.svg"
            width={250}
          />
          <Spinner size={40} />
        </div>
      )}
    </Transition>
  )
}

export default Loader
