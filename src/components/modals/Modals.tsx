import ModalCall from '@components/modals/ModalCall/ModalCall'
import ModalSignUp from '@components/modals/ModalSignUp/ModalSignUp'
import ModalSignIn from '@components/modals/ModalSignIn/ModalSignIn'
import ModalCart from '@components/modals/ModalCart/ModalCart'
import ModalFeedback from '@components/modals/ModalFeedback/ModalFeedback'
import ModalOrder from './ModalOrder/ModalOrder'
import ModalCatalog from '@components/modals/ModalCatalog/ModalCatalog'
import { useAppSelector } from '@store/hooks'
import { selectCatalog } from '@store/selectors/catalog'
import ModalProfile from '@components/modals/ModalProfile/ModalProfile'
import ModalPassword from '@components/modals/ModalPassword/ModalPassword'
import ModalForgotPassword from '@components/modals/ModalForgotPassword/ModalForgotPassword'
import { AnimatePresence } from 'framer-motion'

function Modals() {
  const { catalog } = useAppSelector(selectCatalog)
  const { user } = useAppSelector((state) => state.user)
  const { isOpen: isProfileOpen } = useAppSelector((state) => state.profile)
  const { isOpen: isPasswordOpen } = useAppSelector((state) => state.password)
  const { isOpen: isForgotPasswordOpen } = useAppSelector(
    (state) => state.forgotPassword,
  )

  return (
    <>
      <ModalCall />
      <ModalSignUp />
      <ModalSignIn />
      <ModalCart />
      {catalog && <ModalCatalog catalogMenu={catalog} />}
      <ModalFeedback />
      <ModalOrder />
      <AnimatePresence>
        {isProfileOpen && <ModalProfile />}
        {isPasswordOpen && <ModalPassword />}
        {isForgotPasswordOpen && !user && <ModalForgotPassword />}
      </AnimatePresence>
    </>
  )
}

export default Modals
