import classes from './ModalProfile.module.scss'
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
import { checkUserAuth, userAuth } from '@store/reducers/userSlice'
import { Option, Select } from '@ui/Select/Select'
import Spinner from '@ui/spinners/Spinner/Spinner'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { useWindowSize } from 'usehooks-ts'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackMobile from '@ui/BackMobile/BackMobile'
import { closeProfile } from '@store/reducers/profileSlice'

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

function ModalProfile() {
  const [isPhoneConfirm, setIsPhoneConfirm] = useState<boolean>(false)
  const [validatePhone, setValidatePhone] = useState<boolean>(false)
  const { isOpen } = useAppSelector((state) => state.profile)
  const { user, token } = useAppSelector((state) => state.user)
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
    defaultValues: {
      name: user?.name,
      address: user?.address,
      sex: user?.gender_id?.toString(),
      phone: normalizePhoneNumber(`+${user?.phone}`),
      email: user?.email,
    },
  })

  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    address: true,
    email: true,
    phone: true,
  })

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

    return () => {
      setIsDisabled({
        name: true,
        phone: true,
        email: true,
        address: true,
      })
    }
  }, [isOpen, width])

  const onClose = () => {
    reset()
    dispatch(closeProfile())
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const phone = getValues('phone').replace(/\s/g, '').substring(1)
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('name', data.name)
    formData.append('gender_id', data.sex)
    formData.append('address', data.address)
    formData.append('email', data.email)
    formData.append('phone', phone)
    formData.append('otp', data.otp)

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      // redirect: 'follow'
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/user/update`,
        requestOptions,
      )
      const result = await response.json()

      if (response.status === 200) {
        toast.success('Успешно изменено')
        dispatch(checkUserAuth())
        reset()
        onClose()
      } else {
        toast.error('Что-то пошло не так')
      }
    } catch (e) {
      toast.error('Что-то пошло не так')
    }
  }

  const changeable = (name: string) => () =>
    setIsDisabled({ ...isDisabled, [name]: false })

  if (!user) return null

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
          Изменение профиля
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <form>
          <div className={classes.FormGroup}>
            <Input
              type="text"
              placeholder="ФИО"
              label="Имя"
              classNames={{ group: classes.InputGroup }}
              // defaultValue={`${user?.name}`}
              errorMessage={errors.name?.message}
              disabled={isDisabled.name}
              {...register('name', {
                required: 'Пожалуйста введите своё имя',
              })}
            />
            <EditButton
              isDisabled={isDisabled.name}
              changeable={changeable('name')}
            />
          </div>
          <Select
            defaultValue={user?.gender_id?.toString()}
            {...register('sex', {
              required: 'Пожалуйста выберите ваш пол',
            })}
            errorMessage={errors.sex?.message}
          >
            <Option isPlaceholder={true}>Ваш пол</Option>
            <Option value="1">Мужской</Option>
            <Option value="2">Женский</Option>
          </Select>

          <div className={classes.FormGroup}>
            <Input
              type="text"
              placeholder="Адрес доставки"
              label="Адрес доставки"
              // defaultValue={user?.address}
              disabled={isDisabled.address}
              classNames={{ group: classes.InputGroup }}
              errorMessage={errors.address?.message}
              {...register('address', {
                required: 'Пожалуйста введите адрес',
              })}
            />
            <EditButton
              isDisabled={isDisabled.address}
              changeable={changeable('address')}
            />
          </div>

          <div className={classes.FormGroup}>
            <Input
              type="email"
              placeholder="Email"
              label="Email"
              // defaultValue={user?.email}
              classNames={{ group: classes.InputGroup }}
              disabled={isDisabled.email}
              errorMessage={errors.email?.message}
              {...register('email', {
                required: 'Пожалуйста введите свой E-mail',
              })}
            />
            <EditButton
              isDisabled={isDisabled.email}
              changeable={changeable('email')}
            />
          </div>

          <div className={classes.FormGroup}>
            <Input
              type="text"
              placeholder="Номер телефона"
              label="Телефон"
              classNames={{ group: classes.InputGroup }}
              maxLength={16}
              disabled={isDisabled.phone}
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
            <EditButton
              isDisabled={isDisabled.phone}
              changeable={changeable('phone')}
            />
          </div>
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
            Изменить
          </Button>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalProfile

function EditButton({
  isDisabled,
  changeable,
}: {
  isDisabled: boolean
  changeable: () => void
}) {
  if (!isDisabled) return null

  return (
    <button
      className={classes.EditButton}
      onClick={changeable}
    >
      Изменить
    </button>
  )
}
