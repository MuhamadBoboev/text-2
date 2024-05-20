import classes from './Purchase.module.scss'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import CertificateIcon from '@assets/icons/certificate.svg'
import { toMainMenu, toMenuDeliveryGroup } from '@store/reducers/menuSlice'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { useWindowSize } from 'usehooks-ts'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'

function Purchase() {
  const dispatch = useAppDispatch()
  const { isOpen, pages } = useAppSelector((state) => state.menu)

  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
  ]

  const { width } = useWindowSize()
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
        isShow={isOpen && pages.purchase.main}
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
      <ModalContent>
        <ul className={classes.MenuList}>
          {/*{guaranteeList.map(({content, title}, index) => (*/}
          {/*  <li key={index} className={classes.Item}>*/}
          {/*    <CertificateIcon*/}
          {/*      width={24}*/}
          {/*      height={24}*/}
          {/*    />*/}
          {/*    <h3>{title}</h3>*/}
          {/*    <p>{content}</p>*/}
          {/*  </li>*/}
          {/*))}*/}

          <li className={classes.Item}>
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
      <ModalBack onClick={() => dispatch(toMainMenu())} />
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

export default Purchase
