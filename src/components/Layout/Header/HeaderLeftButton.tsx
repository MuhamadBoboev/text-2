import { createContext, ReactNode, useState } from 'react'
import classes from '@components/Layout/Header/Header.module.scss'
import { openMenu } from '@store/reducers/menuSlice'
import Burger from '@ui/Burger/Burger'
import { useAppDispatch } from '@store/hooks'

interface HeaderLeftButtonProps {
  children: ReactNode
  renderButton: (children: ReactNode) => void
}

export const HeaderLeftButtonContext = createContext<HeaderLeftButtonProps>({
  children: null,
  renderButton: () => {},
})

function HeaderLeftButtonState({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const [element, setElement] = useState<ReactNode>(
    <Burger className={classes.Burger} />,
  )
  const renderButton = (children: ReactNode) => {
    setElement(children)
  }

  return (
    <HeaderLeftButtonContext.Provider
      value={{
        children: element,
        renderButton: renderButton,
      }}
    >
      {children}
    </HeaderLeftButtonContext.Provider>
  )
}

export default HeaderLeftButtonState
