import classes from './ModalBack.module.scss'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'

interface ModalBackProps {
  onClick: () => void
  className?: string
}

function ModalBack({ onClick, className }: ModalBackProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(classes.Button, className)}
    >
      <HandySvg
        src="/assets/icons/modal-back.svg"
        width={24}
        height={24}
      />
    </button>
  )
}

export default ModalBack
