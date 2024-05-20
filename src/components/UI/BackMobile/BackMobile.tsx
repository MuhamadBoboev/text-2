import classes from './BackMobile.module.scss'
import {
  AllHTMLAttributes,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import clsx from 'clsx'
import BackIcon from '@assets/icons/back.svg'
import { useSsr } from 'usehooks-ts'
import { createPortal } from 'react-dom'

interface BackMobileProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  isShow?: boolean
}

function BackMobile({ className, isShow, ...keys }: BackMobileProps) {
  const { isBrowser } = useSsr()
  const rootRef = useRef<HTMLDivElement>(null)
  const rootElement = isBrowser && document.getElementById('close-modal')

  const element = useMemo(() => {
    if (isBrowser) {
      return document.createElement('div')
    }
  }, [])

  useEffect(() => {
    if (isShow && rootElement) {
      rootElement.appendChild(element!)
    }
  }, [isShow])

  return typeof window !== 'undefined'
    ? createPortal(
        <button
          className={clsx(classes.Back, className)}
          {...keys}
        >
          <BackIcon />
        </button>,
        element!,
      )
    : null

  // return (
  //   <button
  //     className={clsx(classes.Back, className)}
  //     {...keys}
  //   >
  //     <BackIcon/>
  //   </button>
  // )
}

export default BackMobile
