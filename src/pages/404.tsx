import classes from '@styles/page/NotFound.module.scss'
import { HandySvg } from 'handy-svg'
import Button from '@ui/Button/Button'
import Head from 'next/head'

function NotFound() {
  return (
    <div className={classes.NotFound}>
      <Head>
        <title>404 Страница не найдена | La Cite</title>
      </Head>
      <div className={classes.Center}>
        <HandySvg
          src="/assets/img/logo-big.svg"
          className={classes.Logo}
          width={114}
          height={96}
        />
      </div>
      <h1 className={classes.Title}>
        <span className={classes.Code}>404</span>
        <span className={classes.Text}>Страница не найдена</span>
      </h1>
      <Button
        className={classes.Button}
        tagName="link"
        withBorder="black"
        background="transparent"
        color="black"
      >
        На главную
      </Button>
    </div>
  )
}

export default NotFound
