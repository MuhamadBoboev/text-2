import classes from './ModalFeedbackContacts.module.scss'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import { toMenuContacts } from '@store/reducers/menuSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { toFeedbackMain } from '@store/reducers/feedbackSlice'
import { useWindowSize } from 'usehooks-ts'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import BackMobile from '@ui/BackMobile/BackMobile'

function ModalFeedbackContacts() {
  const dispatch = useAppDispatch()

  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const { pages, isOpen } = useAppSelector((state) => state.feedback)

  useEffect(() => {
    if (width <= 480 && pages.contacts) {
      renderButton(<BackButton onClick={() => dispatch(toFeedbackMain())} />)
    }
  }, [width])

  return (
    <>
      <BackMobile
        isShow={isOpen && pages.contacts}
        onClick={() => dispatch(toFeedbackMain())}
      />
      <ModalHeader className={classes.ModalHeader}>
        {/*<Breadcrumbs*/}
        {/*  className={classes.Breadcrumbs}*/}
        {/*  list={breadcrumbsList}*/}
        {/*  active={{*/}
        {/*    text: 'Номера телефонов'*/}
        {/*  }}*/}
        {/*/>*/}
        <H2
          weight={700}
          className={classes.Title}
        >
          Номера телефонов
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.MenuList}>
          <li className={classes.Item}>
            <Link
              href="tel:+992987260206"
              className={classes.Link}
            >
              <HandySvg
                src="/assets/icons/telephone.svg"
                width={24}
                height={24}
              />
              <h3>+992 987260206</h3>
              <p>г. Душанбе пр. Рудаки 70</p>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link
              href="tel:+992987260205"
              className={classes.Link}
            >
              <HandySvg
                src="/assets/icons/telephone.svg"
                width={24}
                height={24}
              />
              <h3>+992 987260205</h3>
              <p>г. Душанбе пр. Рудаки 32</p>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link
              href="tel:+992987260207"
              className={classes.Link}
            >
              <HandySvg
                src="/assets/icons/telephone.svg"
                width={24}
                height={24}
              />
              <h3>+992 987260207</h3>
              <p>г. Душанбе ТЦ “Саодат”</p>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link
              href="tel:+992985421801"
              className={classes.Link}
            >
              <HandySvg
                src="/assets/icons/telephone.svg"
                width={24}
                height={24}
              />
              <h3>+992 985421801</h3>
              <p>г. Душанбе ТЦ “Сиема Молл”</p>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link
              href="tel:+992985421810"
              className={classes.Link}
            >
              <HandySvg
                src="/assets/icons/telephone.svg"
                width={24}
                height={24}
              />
              <h3>+992 985421810</h3>
              <p>г. Душанбе ТЦ “Душанбе Молл”</p>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link
              href="tel:+992987260210"
              className={classes.Link}
            >
              <HandySvg
                src="/assets/icons/telephone.svg"
                width={24}
                height={24}
              />
              <h3>+992 987260210</h3>
              <p>г. Худжанд пр. Сомони 1</p>
            </Link>
          </li>
        </ul>
      </ModalContent>

      <ModalBack onClick={() => dispatch(toFeedbackMain())} />
    </>
  )
}

export default ModalFeedbackContacts
