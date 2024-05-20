import { useAppDispatch } from '@store/hooks'
import { modalOrderOpen } from '@store/reducers/modalOrder'
import clsx from 'clsx'
import classes from './HistoryOrderMobile.module.scss'
import { IOrderData } from '@models/IOrder'
import Pagination from '@ui/Pagination/Pagination'
import Button from '@ui/Button/Button'
import { HandySvg } from 'handy-svg'
import { useState } from 'react'
import BackMobile from '@ui/BackMobile/BackMobile'

interface HistoryOrderMobileProps {
  orders: IOrderData | null
  setPage: any
  loadOrders: any
}

function HistoryOrderMobile({
  orders,
  setPage,
  loadOrders,
}: HistoryOrderMobileProps) {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'rejected'>(
    'fulfilled',
  )
  const [statusId, setStatusId] = useState<null | number>(null)

  if (orders?.data.length === 0) {
    return (
      <div className={classes.Empty}>
        <p className={classes.EmptyTitle}>
          Пока что у вас
          <br /> нет заказов
        </p>
        <p className={classes.EmptySubtitle}>Выберите товары</p>
        <Button
          className={classes.Button}
          tagName="link"
          href="/products"
        >
          Выбрать товары
        </Button>
      </div>
    )
  }

  return (
    <div className={classes.HistoryOrderMobile}>
      <ul className={classes.List}>
        {orders?.data?.map((order) => (
          <li
            key={order.id}
            className={classes.Item}
            onClick={() => dispatch(modalOrderOpen(order))}
          >
            {order.payment_method_id === 1 && (
              <div className={classes.Right}>
                <Button
                  background="transparent"
                  color="black"
                  type="button"
                  className={clsx(
                    classes.Retry,
                    status === 'pending' &&
                      statusId === order.id &&
                      classes.RetryActive,
                  )}
                  onClick={async (event: any) => {
                    event.stopPropagation()
                    try {
                      setStatusId(order.id)
                      setStatus('pending')
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/web/payment/check/${order.payment?.id}`,
                        {
                          method: 'post',
                          body: '',
                        },
                      )
                      setStatus('fulfilled')
                      loadOrders()
                      setStatusId(null)
                    } catch (e) {}
                  }}
                >
                  <HandySvg
                    className={classes.RetryIcon}
                    src="/assets/icons/retry.svg"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            )}

            <ul className={classes.Images}>
              {order.items.map((item) => (
                <li key={item.id}>
                  <img
                    src={item.product?.image}
                    alt=""
                    width={36}
                    height={36}
                  />
                </li>
              ))}
            </ul>
            <div className={classes.Row}>
              <p className={classes.Label}>Номер заказа</p>
              <h4 className={classes.NumberOrder}>{order.id}</h4>
            </div>
            <div className={classes.Row}>
              <p className={classes.Label}>Количество товаров</p>
              <h4 className={classes.Quantity}>{order.items.length} шт.</h4>
            </div>
            <div className={classes.Row}>
              <p className={classes.Label}>Сумма</p>
              <h4 className={classes.TotalPrice}>{order.total} с.</h4>
            </div>
            <div className={classes.Row}>
              <p className={classes.Label}>Дата</p>
              <p className={classes.Date}>
                {new Date(order.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
            <div className={classes.Row}>
              <p className={classes.Label}>Статус</p>
              <p className={clsx(classes.Status, classes.Delivered)}>
                {order.status_name}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {orders && (
        <Pagination
          handlePageClick={(event: { selected: number }) => {
            setPage(event.selected + 1)
          }}
          className={clsx(
            status === 'pending' && classes.PaginationPending,
            classes.Pagination,
          )}
          pageCount={orders.meta.last_page}
        />
      )}
    </div>
  )
}

export default HistoryOrderMobile
