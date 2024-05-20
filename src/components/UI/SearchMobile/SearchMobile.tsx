import { HandySvg } from 'handy-svg'
import classes from './SearchMobile.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { toggleSearch } from '@store/reducers/searchSlice'

interface SearchMobileProps {
  // toggle: () => void
  // isOpen: boolean
}

function SearchMobile({}: SearchMobileProps) {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.search)

  return (
    <div className={classes.Search}>
      <button
        className={classes.Button}
        onClick={() => dispatch(toggleSearch())}
      >
        {isOpen ? (
          <HandySvg
            className={classes.CloseButton}
            src="/assets/icons/close-lite.svg"
            width={18}
            height={18}
          />
        ) : (
          <HandySvg
            src="/assets/icons/search-medium.svg"
            width={24}
            height={24}
          />
        )}
      </button>
    </div>
  )
}

export default SearchMobile
