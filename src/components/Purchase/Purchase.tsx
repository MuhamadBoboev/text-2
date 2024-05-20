import classes from './Purchase.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Button from '@ui/Button/Button'
import Divider from '@ui/Divider/Divider'
import { purchaseList } from '../../../data/purchaseList'
import { useState } from 'react'
import { useAppDispatch } from '@store/hooks'
import { modalCallOpen } from '@store/reducers/modalCall'
import clsx from 'clsx'

function Purchase() {
  const [activeId, setActiveId] = useState<number | null>(null)

  const toggle = (id: number) => {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  const dispatch = useAppDispatch()

  return (
    <section className={classes.Section}>
      <Wrapper className={classes.Wrapper}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[{ text: 'Главная', link: '/' }]}
          active={{ text: 'Условия покупки' }}
        />
        <header className={classes.Header}>
          <H2 className={classes.Title}>Условия покупки</H2>

          <div className={classes.Buttons}>
            <Button
              className={classes.ButtonCall}
              padding={10}
              tagName="a"
              href="tel:+992900000000"
            >
              Позвонить
            </Button>
            <Button
              className={classes.ButtonOrderCall}
              padding={10}
              withBorder="gray"
              background="transparent"
              color="black"
              onClick={() => dispatch(modalCallOpen())}
            >
              Заказать звонок
            </Button>
          </div>
        </header>
        <Divider />

        <ul className={classes.List}>
          {purchaseList.map(({ text, id, title }, index) => (
            <li
              key={id}
              className={`${classes.Item} ${index === activeId ? classes.Active : ''}`}
              onClick={() => toggle(index)}
            >
              <h3 className={classes.Name}>
                {title}
                <span
                  className={clsx(
                    classes.Icon,
                    index === activeId && classes.OpenIcon,
                  )}
                />
              </h3>
              <p className={classes.Description}>{text}</p>
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  )
}

export default Purchase
