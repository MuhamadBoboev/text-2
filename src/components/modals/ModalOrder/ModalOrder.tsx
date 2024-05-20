import Divider from '@components/UI/Divider/Divider'
import Modal from '@components/UI/Modal/Modal'
import ModalHeader from '@components/UI/Modal/ModalHeader/ModalHeader'
import H2 from '@components/UI/Typography/H2/H2'
import classes from './ModalOrder.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { modalOrderClear, modalOrderClose } from '@store/reducers/modalOrder'
import ModalContent from '@components/UI/Modal/ModalContent/ModalContent'
import ModalFooter from '@components/UI/Modal/ModalFooter/ModalFooter'
import clsx from 'clsx'
import OrderProductCard from '@components/modals/ModalOrder/OrderProductCard/OrderProductCard'
import { useContext, useEffect } from 'react'
import Burger from '@ui/Burger/Burger'
import { clearCartState } from '@store/reducers/cartSlice'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackButton from '@ui/BackButton/BackButton'
import BackMobile from '@ui/BackMobile/BackMobile'

function ModalOrder() {
  const { isOpen, order } = useAppSelector((state) => state.modalOrder)
  const dispatch = useAppDispatch()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const onClose = () => {
    dispatch(modalOrderClose())
  }

  useEffect(() => {
    if (isOpen) {
      renderButton(<BackButton onClick={onClose} />)
    }
  }, [isOpen])

  if (!order) return null

  const total = order.sub_total

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onUnmount={() => {
        renderButton(<Burger className={classes.Burger} />)
        dispatch(modalOrderClear())
      }}
    >
      <BackMobile
        onClick={onClose}
        isShow={isOpen}
      />
      <ModalHeader className={classes.ModalHeader}>
        <p className={classes.NumberOrder}>№{order?.id}</p>
        <div className={classes.HeaderTop}>
          <H2
            weight={700}
            className={classes.Title}
          >
            Ваш заказ
          </H2>
          <p
            className={clsx(
              classes.Status,
              order.status_id === 5 && classes.Success,
              order.status_id === 3 && classes.Delivery,
              order.status_id === 6 && classes.Canceled,
              order.status_id === 1 && classes.NewOrder,
            )}
          >
            {order?.status_name}
          </p>
        </div>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.List}>
          {order?.items.map((item) => (
            <li
              key={item.id}
              className={classes.Item}
            >
              <OrderProductCard
                className={classes.Product}
                key={item.id}
                id={item.id}
                attribute_name={item.attribute_name}
                product={item.product}
                attribute_id={item.attribute_id}
                item_id={item.id}
                item_name={item.item_name}
                order_id={item.order_id}
                item_price={item.item_price}
                item_quantity={item.item_quantity}
              />
            </li>
          ))}
        </ul>
      </ModalContent>
      <ModalFooter>
        <div className={classes.Info}>
          {order.payment_method_id !== 3 && (
            <p className={classes.InfoItem}>
              <span className={classes.InfoTitle}>Доставка</span>
              <span className={clsx(classes.InfoValue)}>
                {order.shipping_type === 'standard' ? 15 : 30} с.
              </span>
            </p>
          )}
          <p className={classes.InfoItem}>
            <span className={classes.InfoTitle}>Скидки</span>
            <span className={clsx(classes.InfoValue, classes.Red)}>
              {order.discount}
              {order.discount_type === 'percent' ? '%' : ' с.'}
            </span>
          </p>
          <p className={classes.InfoItem}>
            <span className={classes.InfoTitle}>Всего</span>
            <span className={clsx(classes.InfoValue, classes.Green)}>
              {order.sub_total} с.
            </span>
          </p>
        </div>
        <button
          className={classes.Close}
          onClick={onClose}
        >
          Закрыть
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalOrder
