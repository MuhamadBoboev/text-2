import classes from './GuaranteesGroup.module.scss'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  openMenu,
  toMainMenu,
  toMenuDelivery,
  toMenuGuarantees,
  toMenuPayment,
} from '@store/reducers/menuSlice'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import { useWindowSize } from 'usehooks-ts'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import { isMainMenu } from '@store/reducers/menuSlice/helpers'
import BackMobile from '@ui/BackMobile/BackMobile'
import CertificateIcon from '@assets/icons/certificate.svg'

function GuaranteesGroup() {
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const { isOpen, pages } = useAppSelector((state) => state.menu)

  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
  ]
  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    if (width <= 480) {
      renderButton(<BackButton onClick={() => dispatch(toMainMenu())} />)
    }
  }, [width])

  return (
    <>
      <BackMobile
        onClick={() => dispatch(toMainMenu())}
        isShow={isOpen && pages.deliveryGroup.main}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'Условия покупки',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Условия покупки
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.MenuList}>
          <li
            onClick={() => dispatch(toMenuDelivery())}
            tabIndex={0}
            className={classes.Item}
          >
            <h3>Доставка</h3>
            <p>Общая инфромация о доставке</p>
          </li>
          <li
            onClick={() => dispatch(toMenuPayment())}
            tabIndex={0}
            className={classes.Item}
          >
            <h3>Оплата</h3>
            <p>Общая информация о способах оплаты в нашем магазине</p>
          </li>
          <li
            onClick={() => dispatch(toMenuGuarantees())}
            tabIndex={0}
            className={classes.Item}
          >
            <h3>Гарантия</h3>
            <p>Гарантии на продукции и условия гарантии</p>
          </li>
          <li className={classes.ItemPurchase}>
            <CertificateIcon
              width={24}
              height={24}
            />
            <h3>УСЛОВИЯ ПОКУПКИ</h3>
            <p>
              Уважаемые покупатели! Спешим осведомить Вас о том, что
              приобретенный на сайте товар обмену и возврату не подлежит.
            </p>
            <p>
              Оформляя заказ, пожалуйста, проверьте корзину на наличие
              нежелательных товаров.
            </p>
          </li>
        </ul>
      </ModalContent>
      <ModalFooter className={classes.Footer}>
        {/*<Button*/}
        {/*  type="button"*/}
        {/*  className={classes.CloseButton}*/}
        {/*  size={100}*/}
        {/*  background="transparent"*/}
        {/*  color="black"*/}
        {/*  onClick={() => dispatch(toMainMenu())}*/}
        {/*>Назад</Button>*/}
      </ModalFooter>
      <ModalBack onClick={() => dispatch(toMainMenu())} />
    </>
  )
}

export default GuaranteesGroup
