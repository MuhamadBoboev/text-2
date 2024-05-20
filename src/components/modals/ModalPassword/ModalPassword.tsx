import classes from './ModalPassword.module.scss'
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
import { closePassword } from '@store/reducers/passwordSlice'

type Inputs = {
  old_password: string
  password: string
  password_confirmation: string
}

function ModalPassword() {
  const { isOpen } = useAppSelector((state) => state.password)
  const dispatch = useAppDispatch()
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
    dispatch(closePassword())
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.password_confirmation) {
      setError('password_confirmation', { message: 'Пароль не совпадает' })
      return
    }

    const formData = new FormData()
    formData.append('old_password', data.old_password)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.password_confirmation)

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
        `${process.env.NEXT_PUBLIC_API_URL}/web/user/update-password`,
        requestOptions,
      )

      if (response.status === 401) {
        toast.error('Неправильный пароль')
        return
      }

      if (response.status === 200) {
        toast.success('Успешно изменено')
        reset()
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
          Изменение пароля
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <form>
          <Input
            type="password"
            placeholder="Старый пароль"
            label="Старый пароль"
            classNames={{ group: classes.InputGroup }}
            // defaultValue={`${user?.name}`}
            errorMessage={errors.old_password?.message}
            {...register('old_password', {
              required: 'Пожалуйста введите старый пароль',
            })}
          />
          <Input
            type="password"
            placeholder="Новый пароль"
            label="Новый пароль"
            classNames={{ group: classes.InputGroup }}
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

export default ModalPassword
