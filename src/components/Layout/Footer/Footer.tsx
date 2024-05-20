import classes from './Footer.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import FooterLinks from '@components/Layout/Footer/FooterLinks/FooterLinks'
import Link from 'next/link'
import { useWindowSize } from 'usehooks-ts'
import FooterMobile from '@components/Layout/Footer/FooterMobile/FooterMobile'
import { useAppDispatch } from '@store/hooks'
import { ICatalogMenu } from '@models/ICatalogMenu'
import FooterBottom from '@components/Layout/Footer/FooterBottom/FooterBottom'
import { useState } from 'react'
import Button from '@ui/Button/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

interface FooterProps {}

function Footer({}: FooterProps) {
  const { width } = useWindowSize()
  const [value, setValue] = useState('')

  const onSubmit = async () => {
    if (value) {
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
      message += `<b>Контакт:</b> ${value}\n`
      message += `<b>Дата: ${new Date().toLocaleString()}</b>\n`
      message += `<b>Тип устройства: ${device}</b>`

      try {
        const status = await axios.post(URL_API, {
          chat_id: CHAT_ID,
          parse_mode: 'html',
          text: message,
        })
        setValue('')
        toast.success('Успешно отправлено')

        return status
      } catch (error) {
        toast.error('Произошла ошибка! Попробуйте заново')
        return false
      }
    }
  }

  if (width < 520) return <FooterMobile />

  return (
    <footer className={classes.Footer}>
      <Wrapper className={classes.Wrapper}>
        <div className={classes.Top}>
          <div className={classes.Left}>
            <Link
              className={classes.Logo}
              href="/"
            >
              <img
                src="/assets/img/logo.svg"
                alt="La Cite"
                width={144}
                height={53}
              />
            </Link>

            <form className={classes.Form}>
              <p className={classes.FormText}>
                Не нашли нужный товар?
                <br />
                Оставьте контакты и мы свяжемся с вами!
              </p>
              <input
                className={classes.Input}
                type="text"
                name="phone"
                placeholder="Телефон или Email"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                }}
              />
              <Button
                type="button"
                className={classes.Button}
                disabled={value === ''}
                onClick={onSubmit}
              >
                Отправить
              </Button>
            </form>
          </div>
          <FooterLinks />
        </div>
        <FooterBottom />
      </Wrapper>
    </footer>
  )
}

export default Footer
