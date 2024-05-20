import classes from './ModalFeedback.module.scss'
import Modal from '@ui/Modal/Modal'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Link from 'next/link'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import {
  openMenu,
  toMenuContacts,
  toMenuTelephones,
} from '@store/reducers/menuSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  closeFeedback,
  toFeedbackContacts,
} from '@store/reducers/feedbackSlice'
import clsx from 'clsx'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { useWindowSize } from 'usehooks-ts'
import { modalOpenContacts } from '@store/reducers/contactsSlice'
import ModalFeedbackContacts from '@components/modals/ModalFeedback/pages/ModalFeedbackContacts/ModalFeedbackContacts'
import BackMobile from '@ui/BackMobile/BackMobile'

function ModalFeedback() {
  const dispatch = useAppDispatch()
  const { isOpen, pages } = useAppSelector((state) => state.feedback)
  const { width } = useWindowSize()

  const onClose = () => dispatch(closeFeedback())

  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    if (width <= 480 && pages.main) {
      renderButton(<BackButton onClick={onClose} />)
    }
    if (!isOpen) {
      renderButton(<Burger className={classes.Burger} />)
    }
  }, [isOpen, width, pages])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <BackMobile
        isShow={isOpen && pages.main}
        onClick={onClose}
      />
      {pages.contacts && <ModalFeedbackContacts />}
      {pages.main && (
        <>
          <ModalHeader className={classes.ModalHeader}>
            <H2
              weight={700}
              className={classes.Title}
            >
              Задать вопрос
            </H2>
            <Divider className={classes.Divider} />
          </ModalHeader>
          <ModalContent className={classes.Content}>
            <ul className={classes.MenuList}>
              <li className={clsx(classes.Item, classes.Whatsapp)}>
                <Link
                  target="_blank"
                  href="https://wa.me/+992711848484"
                  className={classes.Link}
                >
                  <h3>WhatsApp</h3>
                  <p>Напишите нам в Whatsapp, наш эксперт вам ответит</p>
                </Link>
              </li>
              <li className={clsx(classes.Item, classes.Telegram)}>
                <Link
                  target="_blank"
                  href="https://t.me/La_cite_bot"
                  className={classes.Link}
                >
                  <h3>Telegram</h3>
                  <p>Напишите нам в Telegram наш эксперт вам ответит</p>
                </Link>
              </li>
              <li className={clsx(classes.Item, classes.Phone)}>
                <div
                  onClick={() => {
                    dispatch(toFeedbackContacts())
                  }}
                  className={classes.Link}
                >
                  <h3>Позвонить</h3>
                  <p>
                    Задайте интересующие вас вопросы, связавшись на прямую с
                    нашим экспертом
                  </p>
                </div>
              </li>
            </ul>
          </ModalContent>
        </>
      )}
    </Modal>
  )
}

export default ModalFeedback
