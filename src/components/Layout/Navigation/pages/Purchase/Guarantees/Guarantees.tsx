import classes from './Guarantees.module.scss'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import CertificateIcon from '@assets/icons/certificate.svg'
import {
  toMainMenu,
  toMenuDelivery,
  toMenuDeliveryGroup,
  toMenuGuarantees,
  toMenuPayment,
} from '@store/reducers/menuSlice'
import Button from '@ui/Button/Button'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { guaranteeList } from '../../../../../../../data/guarantees'
import { useWindowSize } from 'usehooks-ts'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'

function Guarantees() {
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
        isShow={isOpen && pages.deliveryGroup.guarantees}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'Гарантия',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Гарантия
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <ul className={classes.MenuList}>
          {guaranteeList.map(({ content, title }, index) => (
            <li
              key={index}
              className={classes.Item}
            >
              <CertificateIcon
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

export default Guarantees
