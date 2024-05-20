import classes from './PersonalFormMobile.module.scss'
import Input from '@ui/Input/Input'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import Tabs from '@components/UI/Tabs/Tabs'
import TabContent from '@components/UI/Tabs/TabContent/TabContent'
import Button from '@components/UI/Button/Button'
import { Select } from '@components/UI/Select/Select'
import HistoryOrderMobile from '@components/HistoryOrder/HistoryOrderMobile/HistoryOrderMobile'
import { IOrderData } from '@models/IOrder'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import { useState } from 'react'
import { HandySvg } from 'handy-svg'
import { userLogOut } from '@store/reducers/userSlice'
import { openProfile } from '@store/reducers/profileSlice'
import { openPassword } from '@store/reducers/passwordSlice'

interface PersonalFormMobileProps {
  orders: IOrderData | null
  setPage: any
  loadOrders: any
}

function PersonalFormMobile({
  orders,
  setPage,
  loadOrders,
}: PersonalFormMobileProps) {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.user)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const dispatch = useAppDispatch()

  const genderImg =
    gender === 'female' ? '/assets/icons/woman.svg' : '/assets/icons/man.svg'

  if (!user) return null

  return (
    <form className={classes.FormMobile}>
      <div className={classes.Head}>
        <div className={classes.Picture}>
          <HandySvg
            src={genderImg}
            alt=""
            className={classes.Avatar}
            width={100}
          />
        </div>
        <div className={classes.Text}>
          <h3>{user.name}</h3>
          <p className={classes.Phone}>
            {normalizePhoneNumber('+' + user.phone)}
          </p>
        </div>
      </div>

      <Tabs
        classNames={{
          header: classes.TabHeader,
        }}
        className={classes.Tab}
      >
        <TabContent
          id={1}
          title="Личная информация"
        >
          <div className={classes.Row1}>
            <div className={classes.Input}>
              <Input
                hideLabel
                label="Имя и Фамилия"
                name="fullName"
                value={user.name}
                disabled
              />
              {/*<button>Изменить</button>*/}
            </div>
            <div className={classes.Input}>
              <Input
                hideLabel
                label="Адрес доставки"
                value={user.address}
                disabled
              />
              {/*<button>Изменнить</button>*/}
            </div>
            <Input
              hideLabel
              label="Номер телефона"
              value={normalizePhoneNumber('+' + user.phone)}
              disabled
            />
            <Select
              className={classes.Select}
              onChange={(event: any) => {
                setGender(event.target.value)
              }}
              disabled
            >
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </Select>
          </div>
        </TabContent>
        <TabContent
          id={2}
          title="История покупок"
        >
          <HistoryOrderMobile
            setPage={setPage}
            orders={orders}
            loadOrders={loadOrders}
          />
        </TabContent>
      </Tabs>
      <Button
        className={classes.UpdateProfile}
        onClick={() => {
          dispatch(openPassword())
        }}
        type="button"
        padding={12}
        background="transparent"
        withBorder="secondary"
        color="secondary"
      >
        Изменить пароль
      </Button>
      <Button
        className={classes.UpdateProfile}
        onClick={() => {
          dispatch(openProfile())
        }}
        type="button"
        padding={12}
        background="transparent"
        withBorder="secondary"
        color="secondary"
      >
        Изменить профиль
      </Button>
      <Button
        className={classes.Button}
        type="button"
        background="more"
        onClick={() => {
          if (confirm('Вы точно хотите выйти из аккаунта?')) {
            dispatch(userLogOut())
          }
        }}
      >
        Выйти из аккаунта
      </Button>
    </form>
  )
}

export default PersonalFormMobile
