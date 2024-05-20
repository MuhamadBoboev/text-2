import classes from './Personal.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import PersonalForm from '@components/Personal/PersonalForm/PersonalForm'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { userLogOut } from '@store/reducers/userSlice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Loader from '@ui/Loader/Loader'
import Button from '@ui/Button/Button'
import { openProfile } from '@store/reducers/profileSlice'

function Personal() {
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (status === 'fulfilled') {
      if (!user) {
        router.push('/')
      }
    }
  }, [user, status])

  if (status === 'pending' || !user) return <Loader isLoading={true} />

  return (
    <div className={classes.Section}>
      <Wrapper>
        <header className={classes.Header}>
          <Breadcrumbs
            list={[{ text: 'Главная', link: '/' }]}
            active={{
              text: 'Личный кабинет',
              isActive: true,
            }}
          />
          <div className={classes.TopWrapper}>
            <H2 className={classes.Title}>Личный кабинет</H2>
            <button
              className={classes.LogOut}
              onClick={() => {
                if (confirm('Вы точно хотите выйти из аккаунта?')) {
                  dispatch(userLogOut())
                }
              }}
            >
              Выйти
            </button>
            <Button
              className={classes.UpdateProfile}
              onClick={() => {
                dispatch(openProfile())
              }}
              padding={12}
              background="transparent"
              withBorder="secondary"
              color="secondary"
            >
              Изменить
            </Button>
          </div>
          <Divider />
        </header>
        <PersonalForm />
      </Wrapper>
    </div>
  )
}

export default Personal
