import classes from './SearchInput.module.scss'
import { AllHTMLAttributes, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { getCategoryByQuery } from '@utils/requests/getCategory'
import { IProduct } from '@models/product/IProduct'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useOnClickOutside } from 'usehooks-ts'
import { ScrollbarEvents } from 'swiper/types'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  clearSearchProducts,
  closeSearch,
  fetchQueryProducts,
} from '@store/reducers/searchSlice'
import Spinner from '@ui/spinners/Spinner/Spinner'

interface SearchInputProps extends AllHTMLAttributes<HTMLInputElement> {
  className?: string
  classNames?: {
    input?: string
    button?: string
  }
}

function SearchInput({ className, classNames, ...keys }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('')
  // const [products, setProducts] = useState<IProduct[] | null>(null)
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const rootRef = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { products, isOpen, status } = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  useOnClickOutside(rootRef, () => setOpen(false))

  useEffect(() => {
    let time: any

    if (searchValue !== '') {
      time = setTimeout(() => {
        // getCategoryByQuery({isClient: true, q: searchValue})
        //   .then((data: { data: IProduct[] }) => {
        //     setProducts(data.data)
        //   })
        dispatch(fetchQueryProducts(searchValue))
      }, 200)
    } else {
      setTimeout(() => {
        dispatch(clearSearchProducts())
      }, 200)
    }

    return () => clearTimeout(time)
  }, [searchValue])

  useEffect(() => {
    function onScroll(event: Event) {
      setOpen(false)
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }

    if (open) {
      window.addEventListener('scroll', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  // useOnClickOutside(rootRef, () => {
  //   dispatch(closeSearch())
  //   setSearchValue('')
  //   dispatch(clearSearchProducts())
  // })

  return (
    <div
      ref={rootRef}
      className={`${classes.InputWrapper} ${className || ''}`}
    >
      <form
        action="/products"
        onSubmit={(event) => {
          event.preventDefault()

          if (searchValue !== '') {
            if (products?.length !== 0) {
              router.push(`/products?q=${searchValue}`)
            }
          }
        }}
      >
        <input
          ref={inputRef}
          className={`${classes.Input} ${classNames?.input || ''}`}
          placeholder="Поиск"
          value={searchValue}
          autoComplete="off"
          name="q"
          onFocus={() => setOpen(true)}
          onBlur={(event: any) => {
            if (event.relatedTarget) {
              if (event.relatedTarget.dataset.type !== 'search-result-item') {
                // setOpen(false)
              }
            } else {
              // setOpen(false)
            }
          }}
          onChange={(e: any) => {
            setOpen(true)
            setSearchValue(e.target.value)
          }}
          {...keys}
        />

        {searchValue !== '' && open && (
          <div>
            <ul className={classes.List}>
              {products?.length === 0 && status === 'fulfilled' && (
                <li className={classes.NotFound}>Не найдено</li>
              )}
              {status === 'pending' && (
                <li className={classes.Center}>
                  <Spinner size={24} />
                </li>
              )}
              {status === 'fulfilled' &&
                products?.map((product) => (
                  <li key={product.id}>
                    <Link
                      className={classes.Link}
                      data-type="search-result-item"
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        setOpen(false)
                        setSearchValue('')
                        dispatch(closeSearch())
                      }}
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <button
          className={clsx(
            classes.Button,
            classNames?.button,
            searchValue !== '' && classes.ShowButton,
          )}
          onClick={() => {
            if (products?.length !== 0) {
              router.push(`/products?q=${searchValue}`)
            }
            setOpen(false)
            setSearchValue('')
            dispatch(closeSearch())
          }}
          onKeyDown={(event) => {
            if (event.code === 'Enter') {
              if (products?.length !== 0) {
                router.push(`/products?q=${searchValue}`)
              }
            }
          }}
        >
          Найти
        </button>
      </form>
    </div>
  )
}

export default SearchInput
