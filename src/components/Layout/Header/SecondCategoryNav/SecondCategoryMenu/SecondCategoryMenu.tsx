import classes from './SecondCategoryMenu.module.scss'
import SecondCategoryList from '@components/Layout/Header/SecondCategoryNav/SecondCategoryMenu/SecondCategoryList/SecondCategoryList'
import SecondCategoryItems from '@components/Layout/Header/SecondCategoryNav/SecondCategoryMenu/SecondCategoryItems/SecondCategoryItems'
import { ISubCategory } from '@models/ICategory'
import { useEffect, useMemo, useState } from 'react'
import { getMinId } from '@utils/helpers/getMinId/getMinId'
import Wrapper from '@ui/Wrapper/Wrapper'
import { AnimatePresence, motion } from 'framer-motion'
import { ICatalogCategory } from '@models/ICatalog'

interface SecondCategoryMenuProps {
  categoryList: ICatalogCategory[]
  onClose: () => void
}

function SecondCategoryMenu({
  categoryList,
  onClose,
}: SecondCategoryMenuProps) {
  const minId = useMemo(
    () => getMinId(categoryList.map((category) => category.id)),
    [categoryList],
  )
  const [activeId, setActiveId] = useState(minId)

  useEffect(() => {
    setActiveId(minId)
  }, [categoryList])

  useEffect(() => {
    const keyPressClose = (event: KeyboardEvent) => {
      if (event.code === 'Escape') onClose()
    }

    window.addEventListener('keydown', keyPressClose)

    return () => {
      window.removeEventListener('keydown', keyPressClose)
    }
  }, [])

  const selectCategory = (id: number) => setActiveId(id)

  const activeSubCategory = useMemo(
    () => categoryList.find(({ id }) => id === activeId),
    [activeId, categoryList],
  )

  const variants = {
    animate: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: -100,
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="animate"
      exit="hidden"
      variants={variants}
      transition={{
        duration: 0.1,
      }}
      className={classes.Menu}
    >
      <Wrapper className={classes.Wrapper}>
        {/*<AnimatePresence>*/}
        <SecondCategoryList
          activeId={activeId}
          selectCategory={selectCategory}
          categoryList={categoryList}
          onClose={onClose}
        />
        {activeSubCategory && (
          <SecondCategoryItems
            onClose={onClose}
            items={activeSubCategory.subcategories}
          />
        )}
        {/*</AnimatePresence>*/}
      </Wrapper>
    </motion.div>
  )
}

export default SecondCategoryMenu
