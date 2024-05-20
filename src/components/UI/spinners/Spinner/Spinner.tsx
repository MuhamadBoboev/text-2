import classes from './Spinner.module.scss'

interface SpinnerProps {
  size?: 24 | 40 | 56 | 72 | 88
}

function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <div
      className={classes.Spinner}
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

export default Spinner
