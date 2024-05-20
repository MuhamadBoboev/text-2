import classes from './Catalog.module.scss'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Wrapper from '@ui/Wrapper/Wrapper'
import CatalogQuickLinks from '@components/Layout/Header/Catalog/CatalogQuickLinks/CatalogQuickLinks'
import { HandySvg } from 'handy-svg'
import { useOnClickOutside } from 'usehooks-ts'
import { ICatalogMenu } from '@models/ICatalogMenu'
import { useAppSelector } from '@store/hooks'
import { selectCatalog } from '@store/selectors/catalog'

interface CatalogProps {
  onClose: () => void
}

function Catalog({ onClose }: CatalogProps) {
  const catalogRef = useRef(null)
  const { catalog } = useAppSelector(selectCatalog)

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

  useEffect(() => {
    const keyPressClose = (event: KeyboardEvent) => {
      if (event.code === 'Escape') onClose()
    }

    window.addEventListener('keydown', keyPressClose)

    return () => {
      window.removeEventListener('keydown', keyPressClose)
    }
  }, [])

  useOnClickOutside(catalogRef, (event: any) => {
    if (event?.target?.closest) {
      const target = event?.target?.closest('#catalog-menu-button')

      if (!target) {
        onClose()
      }
    }
  })

  return (
    <motion.div
      ref={catalogRef}
      initial="hidden"
      whileInView="animate"
      exit="hidden"
      viewport={{ once: true }}
      variants={variants}
      transition={{
        duration: 0.1,
      }}
      className={classes.Menu}
    >
      <Wrapper className={classes.Wrapper}>
        {catalog && (
          <CatalogQuickLinks
            onClose={onClose}
            categories={catalog}
          />
        )}
        <button
          className={classes.Close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <HandySvg
            src="/assets/icons/close.svg"
            width={18}
            height={18}
          />
        </button>
      </Wrapper>
    </motion.div>
  )
}

export default Catalog
