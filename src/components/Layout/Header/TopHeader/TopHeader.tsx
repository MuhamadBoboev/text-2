import classes from './TopHeader.module.scss'
import Socials from '@ui/Socials/Socials'
import Wrapper from '@ui/Wrapper/Wrapper'
import TelIcon from '@assets/icons/telephone.svg'
import { useAppDispatch } from '@store/hooks'
import { modalCallOpen } from '@store/reducers/modalCall'
import {
  openMenu,
  toMenuAddresses,
  toMenuTelephones,
} from '@store/reducers/menuSlice'
import { HandySvg } from 'handy-svg'

function TopHeader() {
  const dispatch = useAppDispatch()

  return (
    <div className={classes.Top}>
      <Wrapper className={classes.Wrapper}>
        <div className={classes.Left}>
          <Socials />
        </div>
        <div className={classes.Right}>
          {/*<button*/}
          {/*  className={classes.Phone}*/}
          {/*  onClick={() => {*/}
          {/*    dispatch(openMenu())*/}
          {/*    dispatch(toMenuAddresses())*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <TelIcon*/}
          {/*    width={14}*/}
          {/*    height={14}*/}
          {/*  />*/}
          {/*  Позвонить*/}
          {/*</button>*/}
          <a
            className={classes.Phone}
            href="tel:+992711848484"
          >
            <HandySvg
              src="/assets/icons/phone.svg"
              width={16}
              height={16}
            />
            +992 711 84 84 84
          </a>
          <button
            className={classes.Phone}
            onClick={() => {
              dispatch(openMenu())
              dispatch(toMenuAddresses())
            }}
          >
            <HandySvg
              src="/assets/icons/location.svg"
              width={16}
              height={16}
            />
            Наши адреса
          </button>
          <button
            onClick={() => dispatch(modalCallOpen())}
            className={classes.Call}
          >
            <HandySvg
              src="/assets/icons/phone-incoming.svg"
              width={16}
              height={16}
            />
            Заказать звонок
          </button>
        </div>
      </Wrapper>
    </div>
  )
}

export default TopHeader
