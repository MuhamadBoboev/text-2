import classes from './FooterMobile.module.scss'
import FooterBottom from '@components/Layout/Footer/FooterBottom/FooterBottom'
import Wrapper from '@ui/Wrapper/Wrapper'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { useAppDispatch } from '@store/hooks'
import {
  openMenu,
  toMenuAbout,
  toMenuAddresses,
  toMenuDeliveryGroup,
  toMenuGuarantees,
  toMenuPurchase,
} from '@store/reducers/menuSlice'
import { useRouter } from 'next/router'

function FooterMobile() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  if (router.pathname !== '/') return null

  return (
    <footer className={classes.Footer}>
      <Wrapper>
        <div className={classes.Line} />
        <ul className={classes.List}>
          <li className={classes.Item}>
            <button
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuDeliveryGroup(true))
              }}
              className={classes.Link}
            >
              Условия покупки
              <HandySvg
                src="/assets/icons/arrow-right.svg"
                width={9}
                height={16}
              />
            </button>
          </li>
          <li className={classes.Item}>
            <button
              className={classes.Link}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuAddresses())
              }}
            >
              Наши магазины
              <HandySvg
                src="/assets/icons/arrow-right.svg"
                width={9}
                height={16}
              />
            </button>
          </li>
          <li className={classes.Item}>
            <button
              className={classes.Link}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuAbout())
              }}
            >
              О нас
              <HandySvg
                src="/assets/icons/arrow-right.svg"
                width={9}
                height={16}
              />
            </button>
          </li>
          {/*<li className={classes.Item}>*/}
          {/*  <Link href="/" className={classes.Link}>*/}
          {/*    Новинки*/}
          {/*    <HandySvg*/}
          {/*      src="/assets/icons/arrow-right.svg"*/}
          {/*      width={9}*/}
          {/*      height={16}*/}
          {/*    />*/}
          {/*  </Link>*/}
          {/*</li>*/}
          {/*<li className={classes.Item}>*/}
          {/*  <button*/}
          {/*    className={classes.Link}*/}
          {/*    onClick={() => {*/}
          {/*      dispatch(openMenu())*/}
          {/*      dispatch(toMenuDeliveryGroup())*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Доставка, Оплата и Гарантии*/}
          {/*    <HandySvg*/}
          {/*      src="/assets/icons/arrow-right.svg"*/}
          {/*      width={9}*/}
          {/*      height={16}*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*</li>*/}
        </ul>
        <FooterBottom />
      </Wrapper>
    </footer>
  )
}

export default FooterMobile
