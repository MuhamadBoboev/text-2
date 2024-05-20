import classes from './Modal.module.scss'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLockedBody, useSsr } from 'usehooks-ts'
import CloseButton from '@ui/CloseButton/CloseButton'
import { Transition } from 'react-transition-group'
import clsx from 'clsx'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  onUnmount?: () => void
  rtl?: boolean
  renderContent?: (children: ReactNode) => ReactNode
  classNames?: {
    modal?: string
    backdrop?: string
    content?: string
    closeButton?: string
  }
}

function Modal({
  children,
  isOpen,
  onClose,
  classNames,
  rtl = false,
  onUnmount,
  renderContent,
}: ModalProps) {
  const { isBrowser } = useSsr()
  useLockedBody(isOpen, '__next')
  const modalRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'entering' | 'exiting'>('entering')

  const modalRootElement = isBrowser && document.getElementById('modal')

  const element = useMemo(() => {
    if (isBrowser) {
      return document.createElement('div')
    }
  }, [])

  useEffect(() => {
    if (isOpen && modalRootElement) {
      modalRootElement.appendChild(element!)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleClose)

    return () => window.removeEventListener('keydown', handleClose)
  }, [])

  const duration = 350

  return typeof window !== 'undefined'
    ? createPortal(
        <Transition
          in={isOpen}
          timeout={{
            enter: duration,
            exit: 250,
          }}
          mountOnEnter
          unmountOnExit
          onExited={() => {
            if (modalRootElement) {
              modalRootElement.removeChild(element!)
            }
            onUnmount && onUnmount()
            setStatus('entering')
          }}
          nodeRef={modalRef}
          onExiting={() => {
            setStatus('exiting')
          }}
        >
          {(state) => (
            <div className={`${classes.Modal} ${classNames?.modal || ''}`}>
              <div
                onClick={onClose}
                className={clsx(classes.Backdrop, classNames?.backdrop)}
              />
              <div
                ref={modalRef}
                className={clsx(
                  classes.Content,
                  rtl && classes.Rtl,
                  classNames?.content,
                  status === 'entering' ? classes.Entering : classes.Exiting,
                )}
              >
                <CloseButton
                  className={`${classes.Close} ${classNames?.closeButton || ''}`}
                  aria-label="Закрыть модальное окно"
                  onClick={onClose}
                />
                {(renderContent && renderContent(children)) || children}
              </div>
            </div>
          )}
        </Transition>,
        element!,
      )
    : null
}

export default Modal
