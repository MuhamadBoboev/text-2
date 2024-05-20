import classes from './FilterBrands.module.scss'
import Accordion from '@ui/Accordion/Accordion'
import Checkbox from '@ui/Checkbox/Checkbox'
import { IBrand } from '@models/IBrand'
import { useState } from 'react'
import Input from '@ui/Input/Input'
import { useRouter } from 'next/router'

interface FilterBrandsProps {
  brands: IBrand[] | null
}

function FilterBrands({ brands }: FilterBrandsProps) {
  const [search, setSearch] = useState<string>('')
  const brandsRouter = useRouter()
  const filteredBrands = brands?.filter(
    (brand) => brand.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
  )
  if (!brands) return null

  return (
    <div className={classes.Filter}>
      <Accordion
        onClickOutside={false}
        isActive={true}
        title="Выберите бренд"
      >
        <ul className={classes.List}>
          {filteredBrands
            ?.sort((a, b) => (a.name > b.name ? 1 : -1))
            .sort((a, b) => {
              let checked = (() => {
                const brandsQuery = brandsRouter.query.brands
                if (Array.isArray(brandsQuery)) {
                  return brandsQuery.includes(a.id.toString())
                } else {
                  return brandsQuery === a.id.toString()
                }
              })()
              return checked ? -1 : 1
            })
            .map((brand) => (
              <li
                key={brand.id}
                className={classes.Item}
              >
                <Checkbox
                  classNames={{
                    label: classes.Checkbox,
                  }}
                  checked={(() => {
                    const brandsQuery = brandsRouter.query.brands
                    if (Array.isArray(brandsQuery)) {
                      return brandsQuery.includes(brand.id.toString())
                    } else {
                      return brandsQuery === brand.id.toString()
                    }
                  })()}
                  onChange={(event: any) => {
                    const checked = event.target.checked
                    const brandId = brand.id.toString()

                    switch (typeof brandsRouter.query.brands) {
                      case 'string': {
                        if (checked) {
                          brandsRouter.query.brands = [
                            brandsRouter.query.brands,
                            brandId,
                          ]
                        } else {
                          delete brandsRouter.query.brands
                        }
                        break
                      }
                      case 'undefined': {
                        if (checked) {
                          brandsRouter.query.brands = brandId
                        } else {
                          delete brandsRouter.query.brands
                        }
                        break
                      }
                      case 'object': {
                        if (Array.isArray(brandsRouter.query.brands)) {
                          if (checked) {
                            if (!brandsRouter.query.brands.includes(brandId)) {
                              brandsRouter.query.brands.push(brandId)
                            }
                          } else {
                            brandsRouter.query.brands =
                              brandsRouter.query.brands.filter(
                                (id) => id !== brandId,
                              )
                          }
                        }
                        break
                      }
                    }
                    delete brandsRouter.query.page
                    brandsRouter.push(brandsRouter)
                  }}
                >
                  {brand.name}
                </Checkbox>
              </li>
            ))}
        </ul>
        <Input
          type="text"
          label=""
          placeholder="Выберите название бренда"
          value={search}
          classNames={{
            wrapper: classes.Wrapper,
          }}
          className={classes.Input}
          onChange={(event: any) => {
            setSearch(event.target.value)
          }}
        />
      </Accordion>
    </div>
  )
}

export default FilterBrands
