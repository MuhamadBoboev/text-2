import classes from './PopupInfo.module.scss'
import Image from 'next/image'
import Button from '@ui/Button/Button'
import { HandySvg } from 'handy-svg'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch } from '@store/hooks'

function PopupInfo() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [visited, setVisited] = useState(true)
  useEffect(() => {
    const isVisited = JSON.parse(localStorage.getItem('isVisited') || 'null')
    setVisited(isVisited)
  }, [])

  useEffect(() => {
    const time = setTimeout(() => {
      setIsOpen(true)
    }, 0)

    return () => clearTimeout(time)
  }, [])

  if (visited) {
    return null
  }
  const onClose = () => {
    setIsOpen(false)
    localStorage.setItem('isVisited', JSON.stringify('true'))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          <div className={classes.Modal}>
            <div
              className={classes.Backdrop}
              onClick={onClose}
            />
            <motion.div
              className={classes.Content}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <button
                className={classes.Close}
                onClick={onClose}
              >
                <HandySvg
                  src="/assets/icons/close-lite.svg"
                  width={24}
                  height={24}
                />
              </button>
              <div className={classes.Img}>
                <Image
                  src="/assets/img/demo.jpg"
                  alt=""
                  width={648}
                  height={440}
                />
              </div>
              <div className={classes.Info}>
                <h2 className={classes.Title}>
                  Добро пожаловать! <br />
                  Это демо-версия сайта!
                </h2>
                <p className={classes.Description}>
                  Приносим свои извинения, если в работе сайта возникли
                  сложности. Вы всегда можете посетить наши магазины и приобреси
                  желаемый товар. Сообщить об ошибках в работе сайта можете нам
                  в Telegram
                </p>
                <Button
                  className={classes.Button}
                  tagName="a"
                  href="https://t.me/"
                  target="_blank"
                >
                  Наш Telegram
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PopupInfo
