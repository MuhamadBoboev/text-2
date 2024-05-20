import classes from './ModalSignIn.module.scss'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Input from '@ui/Input/Input'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import { validatePhoneNumberLength } from 'libphonenumber-js'
import Button from '@ui/Button/Button'
import Modal from '@ui/Modal/Modal'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { modalSignUpClose, modalSignUpOpen } from '@store/reducers/signUpSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  modalSignInClose,
  modalSignInMethodToggle,
} from '@store/reducers/signInSlice'
import { useContext, useEffect, useState } from 'react'
import { userAuth } from '@store/reducers/userSlice'
import Spinner from '@ui/spinners/Spinner/Spinner'
import BackButton from '@ui/BackButton/BackButton'
import { useWindowSize } from 'usehooks-ts'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import Burger from '@ui/Burger/Burger'
import { toCartMain } from '@store/reducers/cartSlice'
import BackMobile from '@ui/BackMobile/BackMobile'
import { openForgotPassword } from '@store/reducers/forgotPasswordSlice'

type Inputs = {
  phone: string
  email: string
  password?: string
  otp: string
}

function ModalSignIn() {
  const [isPhoneConfirm, setIsPhoneConfirm] = useState<boolean>(false)
  const [validatePhone, setValidatePhone] = useState<boolean>(false)
  const { isOpen, method } = useAppSelector((state) => state.signIn)
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
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const { width } = useWindowSize()

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const phone = getValues('phone').replace(/\s/g, '').substring(1)
    const formData = new FormData()
    if (data.phone) {
      formData.append('phone', phone)
    }
    if (data.email) {
      formData.append('email', data.email)
    }
    if (data.otp) {
      formData.append('otp', data.otp)
    }

    if (data.password) {
      formData.append('password', data.password)
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    }

    const endpoint = method === 'code' ? 'login' : 'login-by-password'

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/user/${endpoint}`,
        requestOptions,
      )
      const result = await response.json()

      if (result.success) {
        toast.success('Успешно авторизовано')
        reset()
        dispatch(userAuth(result))
        onClose()
      } else {
        if (result.success === false) {
          toast.error('Код подтверждения не правильный')
        } else {
          toast.error('Неправильный логин или пароль')
        }
      }
    } catch (e) {
      toast.error('Что-то пошло не так')
    }
  }

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
    dispatch(modalSignInClose())
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
      <ModalHeader>
        <H2
          weight={700}
          className={classes.Title}
        >
          Вход
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <form className={classes.Form}>
          <Input
            type="text"
            placeholder="Номер телефона"
            label="Телефон"
            classNames={{ group: classes.InputGroup }}
            errorMessage={errors.phone?.message}
            {...register('phone', {
              value: '+992',
              required: 'Пожалуйста введите номер телефона',
              onChange: (event) => {
                event.target.value = normalizePhoneNumber(event.target.value)
              },
              validate: (value) =>
                validatePhoneNumberLength(value, 'TJ')
                  ? 'Некорректный номер'
                  : true,
            })}
          />
          {method === 'code' && (
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

                      const requestOptions: RequestInit = {
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
                        setPhoneConfirmStatus('fulfilled')
                        toast.info('Код подтверждения отправлен')
                      } catch (e) {
                        toast.error('Что-то пошло не так')
                      }
                    }
                  }}
                >
                  {phoneConfirmStatus === 'fulfilled' ? 'Отправлено' : null}
                  {phoneConfirmStatus === 'pending' ? (
                    <div className={classes.Spinner}>
                      <Spinner size={24} />
                    </div>
                  ) : null}
                  {phoneConfirmStatus === 'normal' ? 'Отправить код' : null}
                  {phoneConfirmStatus === 'repeat' ? 'Отправить' : null}
                </Button>
                {phoneConfirmStatus === 'fulfilled' && (
                  <span className={classes.RepeatConfirm}>
                    Отправить код повторно
                    <br /> можно через {timer} сек.
                  </span>
                )}
              </div>
              <Input
                className={classes.InputConfirm}
                classNames={{ group: classes.InputConfirmGroup }}
                type="text"
                placeholder="Код подтверждения"
                label="Телефон"
                maxLength={6}
                errorMessage={errors.otp?.message}
                {...register('otp', {
                  required: 'Введите код подтверждения',
                })}
              />
            </div>
          )}
          {method === 'password' && (
            <Input
              type="password"
              placeholder="Пароль"
              label="Пароль"
              classNames={{ group: classes.InputGroup }}
              errorMessage={errors.password?.message}
              {...register('password', {
                required: false,
              })}
            />
          )}
          <Button
            type="submit"
            className={classes.SendButton}
            size={100}
            onClick={handleSubmit(onSubmit)}
          >
            Войти
          </Button>
          <button
            type="button"
            onClick={() => {
              dispatch(modalSignInMethodToggle())
            }}
            className={classes.ButtonMethod}
          >
            {method === 'code' ? 'Войти по паролю' : 'Войти по номеру телефона'}
          </button>
          <p className={classes.SignIn}>
            Впервые у нас?
            <button
              type="button"
              onClick={() => {
                onClose()
                dispatch(modalSignUpOpen())
              }}
            >
              Зарегистрируйтесь
            </button>
          </p>
          <p className={classes.SignIn}>
            <button
              type="button"
              onClick={() => {
                onClose()
                dispatch(openForgotPassword())
              }}
            >
              Забыли пароль?
            </button>
          </p>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalSignIn
