import classes from './Payment.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import { toMainMenu, toMenuDeliveryGroup } from '@store/reducers/menuSlice'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import CreditCardIcon from '@assets/icons/credit-card.svg'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import { paymentList } from '../../../../../../../data/payments'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import { useWindowSize } from 'usehooks-ts'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'

function Payment() {
  const dispatch = useAppDispatch()
  const { isOpen, pages } = useAppSelector((state) => state.menu)
  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
    {
      text: 'Доставка, оплата и гарантии',
      onClick: () => dispatch(toMenuDeliveryGroup()),
    },
  ]
  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    if (width <= 480) {
      renderButton(
        <BackButton onClick={() => dispatch(toMenuDeliveryGroup())} />,
      )
    }
  }, [width])

  return (
    <>
      <BackMobile
        onClick={() => dispatch(toMenuDeliveryGroup())}
        isShow={isOpen && pages.deliveryGroup.payment}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'Оплата',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Оплата
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <ul className={classes.MenuList}>
          {paymentList.map(({ content, title }, index) => (
            <li
              key={index}
              className={classes.Item}
            >
              <CreditCardIcon
                width={24}
                height={24}
              />
              <h3>{title}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </ModalContent>
      <ModalBack onClick={() => dispatch(toMenuDeliveryGroup())} />
      {/*<ModalFooter className={classes.Footer}>*/}
      {/*  <Button*/}
      {/*    type="button"*/}
      {/*    className={classes.CloseButton}*/}
      {/*    size={100}*/}
      {/*    background="transparent"*/}
      {/*    color="black"*/}
      {/*    onClick={() => dispatch(toMenuDeliveryGroup())}*/}
      {/*  >Назад</Button>*/}
      {/*</ModalFooter>*/}
    </>
  )
}

export default Payment
