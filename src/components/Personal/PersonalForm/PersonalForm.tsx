import classes from './PersonalForm.module.scss'
import Input from '@ui/Input/Input'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Radio from '@components/UI/RadioButton/Radio'
import HistoryOrder from '@components/HistoryOrder/HistoryOrder'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { mobile } from '@utils/constants/breakpoints'
import PersonalFormMobile from '@components/Personal/PersonalForm/PersonalFormMobile/PersonalFormMobile'
import { IOrderData } from '@models/IOrder'
import { HandySvg } from 'handy-svg'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import Button from '@ui/Button/Button'
import clsx from 'clsx'
import { openPassword } from '@store/reducers/passwordSlice'

const perPage = 6

async function fetchOrders(token: string, page: number = 1) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/me/orders?per_page=${perPage}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const orders: IOrderData = await response.json()
    return orders
  } catch (e) {
    return null
  }
}

function PersonalForm() {
  const { user } = useAppSelector((state) => state.user)
  // const [gender, setGender] = useState<'male' | 'female'>('male')
  const { width } = useWindowSize()
  const dispatch = useAppDispatch()

  const [orders, setOrders] = useState<IOrderData | null>(null)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'rejected'>(
    'fulfilled',
  )

  const loadOrders = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setStatus('pending')
      fetchOrders(token, page)
        .then((orders) => {
          setStatus('fulfilled')
          setOrders(orders)
        })
        .catch(() => setStatus('rejected'))
    }
  }

  useEffect(() => {
    loadOrders()
  }, [page])

  if (!user) return null

  if (width < mobile) {
    return (
      <PersonalFormMobile
        loadOrders={loadOrders}
        setPage={setPage}
        orders={orders}
      />
    )
  }

  const genderImg =
    user.gender_id == 2 ? '/assets/icons/female.svg' : '/assets/icons/male.svg'

  const gender: any = {
    1: 'Мужской',
    2: 'Женский',
  }

  return (
    <>
      <form className={classes.Form}>
        <div className={classes.Picture}>
          <HandySvg
            src={genderImg}
            alt=""
            className={classes.Avatar}
            width={64}
          />
        </div>
        <div className={classes.Row1}>
          <Input
            hideLabel={false}
            label="Имя и Фамилия"
            name="fullName"
            value={user.name}
            className={classes.Input}
            disabled
            classNames={{
              group: classes.InputGroup,
              wrapper: classes.InputWrapper,
              label: classes.InputLabel,
            }}
          />
          <Input
            hideLabel={false}
            label="Номер телефона"
            className={classes.Input}
            value={normalizePhoneNumber('+' + user.phone)}
            disabled
            classNames={{
              group: classes.InputGroup,
              wrapper: classes.InputWrapper,
              label: classes.InputLabel,
            }}
          />
        </div>
        <div className={classes.Row2}>
          <Input
            hideLabel={false}
            label="Адрес доставки"
            className={classes.Input}
            value={user.address}
            disabled
            classNames={{
              group: classes.InputGroup,
              wrapper: classes.InputWrapper,
              label: classes.InputLabel,
            }}
          />
          <div className={classes.UpdatePasswordAndGender}>
            <div className={clsx(classes.Sex)}>
              <label className={classes.Label}>Пол</label>
              <div className={classes.Row}>
                {gender[user.gender_id || 1]}
                {/*<div className={classes.radios}>*/}
                {/*  <Radio*/}
                {/*    defaultChecked*/}
                {/*    name="sex"*/}
                {/*    className={classes.Radio}*/}
                {/*    checked={user.gender_id == 1}*/}
                {/*    onChange={(event: any) => {*/}

                {/*    }}*/}
                {/*    classNames={{*/}
                {/*      text: classes.RadioText,*/}
                {/*    }}*/}
                {/*    value="male"*/}
                {/*  >Мужской</Radio>*/}
                {/*  <Radio*/}
                {/*    name="sex"*/}
                {/*    checked={user.gender_id == 2}*/}
                {/*    className={classes.Radio}*/}
                {/*    onChange={(event: any) => {*/}

                {/*    }}*/}
                {/*    value="female"*/}
                {/*  >Женский</Radio>*/}
                {/*</div>*/}
              </div>
            </div>
            <button
              type="button"
              className={classes.Password}
              onClick={() => {
                dispatch(openPassword())
              }}
            >
              Изменить пароль
            </button>
          </div>
        </div>
      </form>
      <HistoryOrder
        orders={orders}
        perPage={perPage}
        setPage={setPage}
        loadOrders={loadOrders}
      />
    </>
  )
}

export default PersonalForm
