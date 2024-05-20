import classes from './Delivery.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import {
  closeMenu,
  openMenu,
  toMainMenu,
  toMenuDeliveryGroup,
} from '@store/reducers/menuSlice'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import BoxIcon from '@assets/icons/box-perspective.svg'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import { deliveryList } from '../../../../../../../data/deliveryList'
import { useWindowSize } from 'usehooks-ts'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'
import { selectMenu } from '@store/selectors/menu'

function Delivery() {
  const dispatch = useAppDispatch()
  const { isOpen, pages, outsideOpen } = useAppSelector(selectMenu)

  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
    {
      text: 'Условия покупки',
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
        onClick={() => {
          if (!outsideOpen) {
            dispatch(toMenuDeliveryGroup())
          } else {
            dispatch(closeMenu())
          }
        }}
        isShow={isOpen && pages.deliveryGroup.delivery}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'Доставка',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Доставка
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <ul className={classes.MenuList}>
          {deliveryList.map(({ content, title }, index) => (
            <li
              key={index}
              className={classes.Item}
            >
              <BoxIcon
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
    </>
  )
}

export default Delivery
