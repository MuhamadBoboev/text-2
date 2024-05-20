import classes from './ModalCartRegisterConfirm.module.scss'
import { useContext, useEffect, useState } from 'react'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  closeCart,
  setDeliveryAddress,
  setOrderComment,
  setPromoCode,
  toCartConfirm,
  toCartMain,
  toCartPayment,
} from '@store/reducers/cartSlice'
import Input from '@ui/Input/Input'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import { validatePhoneNumberLength } from 'libphonenumber-js'
import Button from '@ui/Button/Button'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Option, Select } from '@ui/Select/Select'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { openMenu } from '@store/reducers/menuSlice'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import { userLogOut } from '@store/reducers/userSlice'
import { IPromoCode } from '@models/IPromoCode'
import Spinner from '@ui/spinners/Spinner/Spinner'

type Inputs = {
  name: string
  surname: string
  sex: string
  address: string
  phone: string
  otp: string
  password: string
  promoCode: string
}

function ModalCartRegisterConfirm() {
  const { delivery } = useAppSelector((state) => state.cart.pages)
  const pages = useAppSelector((state) => state.cart.pages)
  const { isOpen } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.user)
  const [isPromoCodeConfirmed, setIsPromoCodeConfirmed] = useState(true)
  const [promoCodeFetchStatus, setPromoCodeFetchStatus] = useState<
    'normal' | 'pending' | 'fulfilled'
  >('normal')
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<Inputs>({
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('phone', user.phone)
      setValue('address', user.address)
    }
  }, [user, delivery, watch])

  useEffect(() => {
    if (getValues('promoCode') === '') {
      setIsPromoCodeConfirmed(true)
    } else {
      setIsPromoCodeConfirmed(false)
    }
    setPromoCodeFetchStatus('normal')
  }, [watch('promoCode')])

  useEffect(() => {
    if (!user && delivery) {
      toast.info('Зарегистрируйтесь или войдите')
    }
  }, [delivery])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (user) {
      dispatch(toCartConfirm())
      dispatch(setDeliveryAddress(data.address))
      // dispatch(setOrderComment(data.comment))
    }
    reset()
  }

  const { renderButton } = useContext(HeaderLeftButtonContext)

  const { width } = useWindowSize()

  useEffect(() => {
    if (width <= 480 && delivery) {
      renderButton(
        <BackButton
          onClick={() => {
            dispatch(toCartMain())
          }}
        />,
      )
    }
    if (!isOpen) {
      renderButton(<Burger className={classes.Burger} />)
    }
  }, [isOpen, pages, width])

  useEffect(() => {
    if (delivery && user) {
      toast.info('Проверьте данные доставки')
    }
  }, [delivery])

  if (!delivery) return null

  if (!user) return null

  return (
    <>
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[
            {
              text: 'Корзина',
              onClick: () => dispatch(toCartMain()),
            },
            { text: 'Доставка', isActive: true },
            { text: 'Оплата', isActive: false },
          ]}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Доставка
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.ModalContent}>
        <form className={classes.Form}>
          <Input
            type="text"
            placeholder="ФИО"
            label="Имя"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.name?.message}
            {...register('name', {
              required: 'Пожалуйста введите своё имя',
              disabled: !!user?.name,
            })}
          />
          <Input
            type="text"
            placeholder="Адрес доставки"
            label="Адрес доставки"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.address?.message}
            {...register('address', {
              required: true,
            })}
          />
          <Input
            type="text"
            placeholder="Номер телефона"
            label="Телефон"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.phone?.message}
            {...register('phone', {
              required: 'Пожалуйста введите номер телефона',
              disabled: !!user?.phone,
              onChange: (event) => {
                event.target.value = normalizePhoneNumber(event.target.value)
              },
              validate: (value) =>
                validatePhoneNumberLength(value, 'TJ')
                  ? 'Некорректный номер'
                  : true,
            })}
          />
          <div className={classes.promoCode}>
            <Input
              type="text"
              placeholder="Промокод"
              label="Промокод"
              classNames={{ group: classes.InputGroup }}
              errorMessage={errors.promoCode?.message}
              {...register('promoCode')}
            />
            <button
              type="button"
              className={classes.applyPromoCode}
              onClick={async () => {
                try {
                  setPromoCodeFetchStatus('pending')
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/web/promocodes/check`,
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        promo_code: getValues('promoCode'),
                        user_id: user?.id,
                      }),
                      headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json',
                      },
                    },
                  )
                  switch (response.status) {
                    case 200:
                      const promoCode: { data: IPromoCode } =
                        await response.json()
                      setPromoCodeFetchStatus('fulfilled')
                      dispatch(setPromoCode(promoCode.data))
                      setIsPromoCodeConfirmed(true)
                      break
                    case 422:
                      toast.error('Промокод не найден')
                      dispatch(setPromoCode(undefined))
                      setPromoCodeFetchStatus('normal')
                      setIsPromoCodeConfirmed(false)
                      break
                    case 400:
                      dispatch(setPromoCode(undefined))
                      setPromoCodeFetchStatus('normal')
                      toast.error('Вы уже использовали этот промокод')
                      setIsPromoCodeConfirmed(false)
                      break
                    default:
                      dispatch(setPromoCode(undefined))
                      setPromoCodeFetchStatus('normal')
                      toast.error('Промокод не найден')
                      setIsPromoCodeConfirmed(false)
                      break
                  }
                } catch (e) {}
              }}
            >
              {promoCodeFetchStatus === 'normal' && 'Применить'}
              {promoCodeFetchStatus === 'pending' && <Spinner size={24} />}
            </button>
          </div>
          <Button
            type="submit"
            className={classes.SendButton}
            size={100}
            onClick={handleSubmit(onSubmit)}
            disabled={!isPromoCodeConfirmed}
          >
            Дальше
          </Button>
          {/*<Button*/}
          {/*  type="button"*/}
          {/*  className={classes.CloseButton}*/}
          {/*  size={100}*/}
          {/*  background="transparent"*/}
          {/*  color="black"*/}
          {/*  onClick={() => {*/}
          {/*    dispatch(toCartMain())*/}
          {/*  }}*/}
          {/*>Назад</Button>*/}

          <p className={classes.SignIn}>
            Не ваш аккаунт?
            <button
              type="button"
              onClick={() => {
                dispatch(userLogOut())
              }}
            >
              Зарегистрируйтесь
            </button>
          </p>
        </form>
      </ModalContent>
      <ModalBack onClick={() => dispatch(toCartMain())} />
    </>
  )
}

export default ModalCartRegisterConfirm
