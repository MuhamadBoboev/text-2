import classes from './ModalForgotPassword.module.scss'
import Modal from '@ui/Modal/Modal'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Button from '@ui/Button/Button'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '@ui/Input/Input'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import { validatePhoneNumberLength } from 'libphonenumber-js'
import { modalSignInOpen } from '@store/reducers/signInSlice'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { checkUserAuth, userAuth } from '@store/reducers/userSlice'
import { Option, Select } from '@ui/Select/Select'
import Spinner from '@ui/spinners/Spinner/Spinner'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { useWindowSize } from 'usehooks-ts'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackMobile from '@ui/BackMobile/BackMobile'
import { closeProfile } from '@store/reducers/profileSlice'
import { closeForgotPassword } from '@store/reducers/forgotPasswordSlice'

type Inputs = {
  phone: string
  password: string
  password_confirmation: string
  otp: string
}

function ModalForgotPassword() {
  const [isPhoneConfirm, setIsPhoneConfirm] = useState<boolean>(false)
  const [validatePhone, setValidatePhone] = useState<boolean>(false)
  const { isOpen } = useAppSelector((state) => state.forgotPassword)
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
    setError,
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
    dispatch(closeForgotPassword())
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.password_confirmation) {
      setError('password_confirmation', { message: 'Пароль не совпадает' })
      return
    }

    const phone = getValues('phone').replace(/\s/g, '').substring(1)
    const formData = new FormData()
    formData.append('phone', phone)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.password_confirmation)
    formData.append('otp', data.otp)

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // redirect: 'follow'
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/user/forgot-password`,
        requestOptions,
      )

      if (response.status === 200) {
        toast.success('Успешно')
        dispatch(checkUserAuth())
        reset()
        dispatch(modalSignInOpen())
        onClose()
      } else {
        toast.error('Что-то пошло не так')
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
          Восстановление пароля
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <form>
          <Input
            type="text"
            placeholder="Номер телефона"
            label="Телефон"
            classNames={{ group: classes.InputGroup }}
            maxLength={16}
            errorMessage={errors.phone?.message}
            {...register('phone', {
              required: 'Пожалуйста введите номер телефона',
              // value: normalizePhoneNumber(`+${user?.phone}`),
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
            placeholder="Новый пароль"
            label="Новый пароль"
            classNames={{ group: classes.InputGroup }}
            // defaultValue={`${user?.name}`}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: 'Пожалуйста введите новый пароль',
              minLength: {
                value: 6,
                message: 'Минимальное количество симв. 6',
              },
            })}
          />
          <Input
            type="password"
            placeholder="Подтверждение пароля"
            label="Подтверждение пароля"
            errorMessage={errors.password_confirmation?.message}
            {...register('password_confirmation', {
              required: 'Пожалуйста введите подтверждение пароля',
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
                        `${process.env.NEXT_PUBLIC_API_URL}/web/user/phone-verify`,
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
            Отправить
          </Button>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalForgotPassword
