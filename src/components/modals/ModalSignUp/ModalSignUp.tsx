import classes from './ModalSignUp.module.scss'
import Modal from '@ui/Modal/Modal'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { modalSignUpClose } from '@store/reducers/signUpSlice'
import Button from '@ui/Button/Button'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '@ui/Input/Input'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import { validatePhoneNumberLength } from 'libphonenumber-js'
import { modalSignInOpen } from '@store/reducers/signInSlice'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { userAuth } from '@store/reducers/userSlice'
import { Option, Select } from '@ui/Select/Select'
import Spinner from '@ui/spinners/Spinner/Spinner'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { useWindowSize } from 'usehooks-ts'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackMobile from '@ui/BackMobile/BackMobile'

type Inputs = {
  name: string
  surname: string
  sex: string
  address: string
  email: string
  phone: string
  otp: string
  password: string
}

function ModalSignUp() {
  const [isPhoneConfirm, setIsPhoneConfirm] = useState<boolean>(false)
  const [validatePhone, setValidatePhone] = useState<boolean>(false)
  const { isOpen } = useAppSelector((state) => state.signUp)
  const dispatch = useAppDispatch()
  const [phoneConfirmStatus, setPhoneConfirmStatus] = useState<
    'fulfilled' | 'pending' | 'rejected' | 'normal' | 'repeat'
  >('normal')
  const [timer, setTimer] = useState<number>(20)
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>({
    mode: 'onSubmit',
  })
  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    const phone = getValues('phone')
    if (phone?.startsWith('+992')) {
      if (!validatePhoneNumberLength(phone, 'TJ')) {
        setValidatePhone(true)
      } else {
        setValidatePhone(false)
      }
    } else {
      setValidatePhone(false)
    }
  }, [watch('phone')])

  useEffect(() => {
    let time: any
    if (phoneConfirmStatus === 'fulfilled') {
      if (timer > 0) {
        time = setTimeout(() => {
          setTimer(timer - 1)
        }, 1000)
      }
    }

    return () => {
      clearTimeout(time)
    }
  }, [phoneConfirmStatus, timer])

  useEffect(() => {
    let time: any
    if (phoneConfirmStatus === 'fulfilled') {
      time = setTimeout(() => {
        setPhoneConfirmStatus('repeat')
        setTimer(20)
      }, 20000)
    }

    return () => {
      clearTimeout(time)
    }
  }, [phoneConfirmStatus])

  useEffect(() => {
    if (width <= 480) {
      if (isOpen && isOpen) {
        renderButton(<BackButton onClick={onClose} />)
      }
    }
    if (!isOpen) {
      renderButton(<Burger />)
    }
  }, [isOpen, width])

  const onClose = () => {
    reset()
    dispatch(modalSignUpClose())
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const phone = getValues('phone').replace(/\s/g, '').substring(1)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('phone', phone)
    formData.append('email', data.email)
    formData.append('gender_id', data.sex)
    formData.append('address', data.address)
    formData.append('password', data.password)
    formData.append('otp', data.otp)

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      // redirect: 'follow'
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/user/register`,
        requestOptions,
      )
      const result = await response.json()

      if (result.success) {
        toast.success('Успешно зарегистрирован')
        dispatch(userAuth(result))
        reset()
        onClose()
      } else {
        toast.error('Неверные данные')
      }
    } catch (e) {
      toast.error('Что-то пошло не так')
    }
  }

  return (
    <Modal
      classNames={{ modal: classes.Modal }}
      isOpen={isOpen}
      onClose={onClose}
      onUnmount={() => {
        setIsPhoneConfirm(false)
        setPhoneConfirmStatus('normal')
        setTimer(20)
      }}
    >
      <BackMobile
        onClick={onClose}
        isShow={isOpen}
      />
      <ModalHeader className={classes.Header}>
        <H2
          weight={700}
          className={classes.Title}
        >
          Регистрация
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <form>
          <Input
            type="text"
            placeholder="ФИО"
            label="Имя"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.name?.message}
            {...register('name', {
              required: 'Пожалуйста введите своё имя',
            })}
          />

          <Select
            {...register('sex', {
              required: 'Пожалуйста выберите ваш пол',
            })}
            errorMessage={errors.sex?.message}
          >
            <Option isPlaceholder={true}>Ваш пол</Option>
            <Option value="1">Мужской</Option>
            <Option value="2">Женский</Option>
          </Select>

          <Input
            type="text"
            placeholder="Адрес доставки"
            label="Фамилия"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.address?.message}
            {...register('address', {
              required: 'Пожалуйста введите адрес',
            })}
          />

          <Input
            type="email"
            placeholder="Email"
            label="Email"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.email?.message}
            {...register('email', {
              required: 'Пожалуйста введите свой E-mail',
            })}
          />

          <Input
            type="text"
            placeholder="Номер телефона"
            label="Телефон"
            classNames={{ group: classes.InputGroup }}
            maxLength={16}
            errorMessage={errors.phone?.message}
            {...register('phone', {
              required: 'Пожалуйста введите номер телефона',
              value: '+992',
              onChange: (event) => {
                event.target.value = normalizePhoneNumber(event.target.value)
              },
              validate: (value) => {
                if (value.startsWith('+992')) {
                  return validatePhoneNumberLength(value, 'TJ')
                    ? 'Некорректный номер'
                    : true
                } else {
                  return 'Номер должна начинаться с +992'
                }
              },
            })}
          />
          <Input
            type="password"
            placeholder="Пароль"
            label="Пароль"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: 'Пожалуйста придумайте пароль',
            })}
          />
          <div className={classes.ConfirmPhone}>
            <div className={classes.ConfirmButtonWrap}>
              <Button
                className={classes.ConfirmButton}
                type="button"
                padding={10}
                background="transparent"
                color="black"
                withBorder="gray"
                disabled={
                  (!validatePhone || isPhoneConfirm) &&
                  phoneConfirmStatus !== 'repeat'
                }
                onClick={async () => {
                  if (!validatePhoneNumberLength(getValues('phone'))) {
                    setIsPhoneConfirm(true)
                    const phone = getValues('phone')
                      .replace(/\s/g, '')
                      .substring(1)
                    const formData = new FormData()
                    formData.append('phone', phone)

                    const requestOptions: any = {
                      method: 'POST',
                      body: formData,
                      redirect: 'follow',
                    }

                    try {
                      setPhoneConfirmStatus('pending')
                      const response = await fetch(
                        'https://api.lacite.tj/api/web/user/phone-verify',
                        requestOptions,
                      )

                      if (response.status !== 200) {
                        throw new Error()
                      }
                      toast.info('Код подтверждения отправлен')

                      setPhoneConfirmStatus('fulfilled')
                    } catch (e) {
                      setPhoneConfirmStatus('rejected')
                      toast.error('Номер уже зарегистрирован')
                    }
                  }
                }}
              >
                {phoneConfirmStatus === 'fulfilled' && 'Отправлено'}
                {phoneConfirmStatus === 'pending' && (
                  <div className={classes.Spinner}>
                    <Spinner size={24} />
                  </div>
                )}
                {phoneConfirmStatus === 'normal' && 'Отправить код'}
                {phoneConfirmStatus === 'repeat' && 'Отправить'}
                {phoneConfirmStatus === 'rejected' && 'Отправить'}
              </Button>
              {phoneConfirmStatus === 'fulfilled' && (
                <span className={classes.RepeatConfirm}>
                  Отправить код повторно можно через {timer} сек.
                </span>
              )}
            </div>
            <Input
              className={classes.InputConfirm}
              classNames={{ group: classes.InputConfirmGroup }}
              type="text"
              placeholder="Код подтверждения"
              label="Телефон"
              {...register('otp', {
                required: 'Введите код подтверждения',
              })}
              errorMessage={errors.otp?.message}
            />
          </div>

          <Button
            type="submit"
            className={classes.SendButton}
            size={100}
            onClick={handleSubmit(onSubmit)}
          >
            Зарегистрироваться
          </Button>
          <p className={classes.SignIn}>
            Уже заказывали у нас?
            <button
              type="button"
              onClick={() => {
                onClose()
                dispatch(modalSignInOpen())
              }}
            >
              Войдите
            </button>
          </p>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalSignUp
