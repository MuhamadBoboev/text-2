import { createContext, ReactNode, useState } from 'react'
// import classes from '@components/Layout/Header/Header.module.scss'
// import { openMenu } from '@store/reducers/menuSlice'
// import Burger from '@ui/Burger/Burger'
// import { useAppDispatch } from '@store/hooks'
import SearchMobile from '@ui/SearchMobile/SearchMobile'

interface HeaderRightButtonProps {
  children: ReactNode
  renderButton: (children: ReactNode) => void
}

export const HeaderRightButtonContext = createContext<HeaderRightButtonProps>({
  children: null,
  renderButton: () => {},
})

function HeaderRightButtonState({ children }: { children: ReactNode }) {
  // const dispatch = useAppDispatch()
  const [element, setElement] = useState<ReactNode>(null)
  const renderButton = (children: ReactNode) => {
    setElement(children)
  }

  return (
    <HeaderRightButtonContext.Provider
      value={{
        children: element,
        renderButton: renderButton,
      }}
    >
      {children}
    </HeaderRightButtonContext.Provider>
  )
}

export default HeaderRightButtonState
