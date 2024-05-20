import classes from './ModalCall.module.scss'
import Modal from '@ui/Modal/Modal'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { modalCallClose } from '@store/reducers/modalCall'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import Button from '@ui/Button/Button'
import Input from '@ui/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import { validatePhoneNumberLength } from 'libphonenumber-js'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import axios from 'axios'
import { toast } from 'react-toastify'
import BackMobile from '@ui/BackMobile/BackMobile'

type Inputs = {
  name: string
  phone: string
  comment: string
}

function ModalCall() {
  const { isOpen } = useAppSelector((state) => state.modalCall)
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const TOKEN = '5950047084:AAEOuImD6-G2EgWl1XnZFEEs83V2eAk34fI'
    const CHAT_ID = '-1001833766342'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    let device = ''

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      device = 'Телефон'
    } else device = 'Компьютер'

    let message = `<b>Звонок!</b>\n`
    message += `<b>Клиент: </b> ${data.name}\n`
    message += `<b>Номер телефона:</b> ${data.phone?.replace(/\s/g, '')}\n`
    message += `<b>Дата: ${new Date().toLocaleString()}</b>\n`
    message += `<b>Комментария:</b> ${data.comment}\n`
    message += `<b>Тип устройства: ${device}</b>`

    try {
      const status = await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })

      reset()
      toast.success('Успешно отправлено')

      return status
    } catch (error) {
      toast.error('Произошла ошибка! Попробуйте заново')
      return false
    }
  }

  const onClose = () => {
    reset()
    dispatch(modalCallClose())
  }

  return (
    <Modal
      classNames={{ modal: classes.Modal, content: classes.ModalContent }}
      isOpen={isOpen}
      onClose={onClose}
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
          Заказать звонок
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>

      {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
      <ModalContent isForm={true}>
        <Input
          type="text"
          placeholder="Как вас зовут?"
          label="Имя"
          errorMessage={errors.name?.message}
          {...register('name', {
            required: 'Пожалуйста введите своё имя',
            onChange: (value) => {},
          })}
        />
        <Input
          type="phone"
          placeholder="Номер телефона"
          label="Телефон"
          errorMessage={errors.phone?.message}
          {...register('phone', {
            required: 'Пожалуйста введите номер телефона',
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
          type="text"
          placeholder="Ваш комментарий"
          label="Ваш комментарий"
          errorMessage={errors.comment?.message}
          {...register('comment', {})}
        />
      </ModalContent>
      {/*</form>*/}

      <ModalFooter>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className={classes.SendButton}
          size={100}
        >
          Отправить
        </Button>

        <Button
          type="button"
          className={classes.CloseButton}
          size={100}
          background="transparent"
          color="black"
          onClick={onClose}
        >
          Закрыть
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCall
