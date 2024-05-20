import classes from './ProductCounter.module.scss'
import clsx from 'clsx'
import { useEffect } from 'react'

interface ProductCounterProps {
  counter: number
  setCounter: any
  min?: number
  max?: number
  classNames?: {
    counter?: string
    decrement?: string
    input?: string
    increment?: string
  }
}

function ProductCounter({
  setCounter,
  counter,
  min = 1,
  max = Infinity,
  classNames,
}: ProductCounterProps) {
  const increment = () => {
    if (counter <= max) {
      setCounter(counter + 1)
    }
  }

  const decrement = () => {
    if (counter >= min) {
      setCounter(counter - 1)
    }
  }

  useEffect(() => {
    if (counter > max) {
      setCounter(max)
    }
  }, [max])

  return (
    <div className={clsx(classes.Counter, classNames?.counter)}>
      <button
        className={clsx(classes.Increment, classNames?.decrement)}
        disabled={counter <= min}
        onClick={decrement}
      >
        -
      </button>
      <input
        className={clsx(classes.Input, classNames?.input)}
        type="number"
        name="product-counter"
        value={counter}
        onChange={(event) => {
          setCounter(+event.target.value)
          event.target.value = event.target.value.replace(/^0+/, '')
        }}
        min={min}
        max={max}
      />
      <button
        className={clsx(classes.Decrement, classNames?.decrement)}
        onClick={increment}
        disabled={counter >= max}
      >
        +
      </button>
    </div>
  )
}

export default ProductCounter
