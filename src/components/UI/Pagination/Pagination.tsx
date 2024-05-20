import classes from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

interface PaginationProps {
  handlePageClick: any
  pageCount: number
  className?: string
  [key: string]: any
}

function Pagination({
  handlePageClick,
  className,
  pageCount,
  ...keys
}: PaginationProps) {
  const [marginPage, setMarginPage] = useState(3)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width >= 1440) {
      setMarginPage(7)
    }
    if (width >= 1200 && width < 1440) {
      setMarginPage(7)
    }
    if (width >= 1024 && width < 1200) {
      setMarginPage(4)
    }
    if (width < 1024 && width > 767) {
      setMarginPage(4)
    }
    if (width < 767) {
      setMarginPage(3)
    }
    if (width < 600) {
      setMarginPage(3)
    }
    if (width < 530) {
      setMarginPage(3)
    }
    if (width < 440) {
      setMarginPage(2)
    }
    if (width < 360) {
      setMarginPage(2)
    }
    // if ()
  }, [width])

  if (pageCount === 1) {
    return null
  }

  return (
    <ReactPaginate
      className={clsx(classes.Pagination, className)}
      breakLabel="..."
      nextLabel={
        <HandySvg
          className={classes.RightIcon}
          src="/assets/icons/arrow-right-bold.svg"
          width={6}
          height={10}
        />
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={marginPage}
      marginPagesDisplayed={marginPage}
      pageCount={pageCount}
      disabledClassName={classes.Disabled}
      previousLabel={
        <HandySvg
          className={classes.LeftIcon}
          src="/assets/icons/arrow-left-bold.svg"
          width={6}
          height={10}
        />
      }
      previousLinkClassName={classes.Prev}
      nextLinkClassName={classes.Next}
      nextClassName={classes.Next}
      previousClassName={classes.Prev}
      pageClassName={classes.Page}
      activeClassName={classes.ActivePage}
      breakClassName={classes.Break}
      {...keys}
    />
  )
}

export default Pagination
