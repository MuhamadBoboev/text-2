import classes from './HistoryOrder.module.scss'
import { useAppDispatch } from '@store/hooks'
import { modalOrderOpen } from '@store/reducers/modalOrder'
import { IOrder, IOrderData } from '@models/IOrder'
import { Fragment, useEffect, useState } from 'react'
import Pagination from '@ui/Pagination/Pagination'
import clsx from 'clsx'
import Button from '@ui/Button/Button'
import { HandySvg } from 'handy-svg'

interface HistoryOrderProps {
  orders: IOrderData | null
  perPage: number
  setPage: any
  loadOrders: () => void
}

function HistoryOrder({
  orders,
  perPage,
  setPage,
  loadOrders,
}: HistoryOrderProps) {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'rejected'>(
    'fulfilled',
  )
  const [statusId, setStatusId] = useState<null | number>(null)

  if (orders?.data.length === 0) {
    return (
      <div className={classes.Empty}>
        <p className={classes.EmptyTitle}>Пока что у вас нет заказов</p>
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
    <div>
      <div className={classes.HistoryOrder}>
        <div className={classes.Head}>
          <div className={classes.Left}>
            <h4>История ваших покупок</h4>
            <p>Все покупки которые вы совершили будут здесь!</p>
          </div>
          {/*<span>Показаны {((orders?.meta.current_page || 1) * perPage) - (perPage - 1)}-{(orders?.meta.current_page || 1) * 6} из {orders ? orders.meta.total : 0}</span>*/}
        </div>
        <table className={classes.Table}>
          <thead>
            <tr className={classes.Row}>
              <th className={classes.Col}>Номер заказа</th>
              <th className={classes.Col}>Товары</th>
              <th className={classes.Col}>Количество</th>
              <th className={classes.Col}>Дата</th>
              <th className={classes.Col}>Цена</th>
              <th className={classes.Col}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order) => (
              <tr
                key={order.id}
                className={classes.Row}
                onClick={() => dispatch(modalOrderOpen(order))}
              >
                <td className={clsx(classes.Col, classes.Id)}>{order.id}</td>
                <td className={classes.Col}>
                  {order.items.map((item) => (
                    <Fragment key={item.id}>
                      {item.product ? (
                        <img
                          key={item.id}
                          className={classes.Image}
                          src={item.product?.image}
                          alt=""
                          width={32}
                          height={32}
                        />
                      ) : null}
                    </Fragment>
                  ))}
                </td>
                <td className={classes.Col}>{order.items.length}</td>
                <td className={classes.Col}>
                  {new Date(order.created_at || '').toLocaleDateString()}
                </td>
                <td className={classes.Col}>
                  <b>{order.total} с.</b>
                </td>
                <td
                  className={clsx(
                    classes.Col,
                    classes.Status,
                    order.status_id === 5 && classes.Success,
                    order.status_id === 3 && classes.Delivery,
                    order.status_id === 6 && classes.Canceled,
                    order.status_id === 1 && classes.NewOrder,
                  )}
                >
                  {order.status_name}
                  {order.payment_method_id === 1 && (
                    <div className={classes.Right}>
                      <Button
                        background="transparent"
                        color="black"
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
                          width={16}
                          height={16}
                        />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders && (
        <Pagination
          handlePageClick={(event: { selected: number }) => {
            setPage(event.selected + 1)
          }}
          className={classes.Pagination}
          pageCount={orders.meta.last_page}
        />
      )}
    </div>
  )
}

export default HistoryOrder
