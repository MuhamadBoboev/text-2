import classes from './FilterGender.module.scss'
import Checkbox from '@ui/Checkbox/Checkbox'
import Accordion from '@ui/Accordion/Accordion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function FilterGender() {
  const router = useRouter()
  const [activeGender, setActiveGender] = useState<string | null>(
    router.query.for_who?.toString() || null,
  )

  const genderList = [
    {
      name: 'Женский',
      id: '2',
    },
    {
      name: 'Мужской',
      id: '1',
    },
    {
      name: 'Унисекс',
      id: '5',
    },
  ]

  useEffect(() => {
    if (activeGender === null) {
      if (router.query.for_who) {
        delete router.query.for_who
        router.push(router)
      }
    } else {
      if (router.query.for_who !== activeGender) {
        router.query.for_who = activeGender
        router.push(router)
      }
    }
  }, [activeGender])

  return (
    <Accordion
      onClickOutside={false}
      isActive={true}
      title="Пол"
    >
      <ul className={classes.List}>
        {genderList.map((gender) => (
          <li
            key={gender.id}
            className={classes.Item}
          >
            <Checkbox
              type="checkbox"
              className={classes.Checkbox}
              value={gender.id}
              name="price-range"
              checked={gender.id === router.query.for_who}
              // defaultChecked={activeGender === router.query.for_who}
              classNames={{
                text: classes.Price,
              }}
              onChange={(event: any) => {
                if (router.query.for_who !== event.target.value) {
                  setActiveGender(event.target.value)
                } else {
                  setActiveGender(null)
                }
              }}
            >
              {gender.name}
            </Checkbox>
          </li>
        ))}
      </ul>
    </Accordion>
  )
}

export default FilterGender
