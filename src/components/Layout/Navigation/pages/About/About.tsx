import classes from './About.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import { toMainMenu } from '@store/reducers/menuSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'

function About() {
  const dispatch = useAppDispatch()
  const { isOpen, pages } = useAppSelector((state) => state.menu)

  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
  ]
  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    if (width <= 480) {
      renderButton(<BackButton onClick={() => dispatch(toMainMenu())} />)
    }
  }, [width])

  return (
    <>
      <BackMobile
        onClick={() => dispatch(toMainMenu())}
        isShow={isOpen && pages.about}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'О нас',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          О нас
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <div className={classes.ImgWrapper}>
          <Image
            className={classes.Img}
            src="/assets/img/about/about1.jpg"
            alt="О нас"
            width={520}
            height={320}
          />
        </div>
        <p className={classes.Text}>
          La Cite - Ваш путеводитель в мир брендовой парфюмерии и косметики. У
          нас Вы сможете приобрести ароматы, которые выделят Вас из толпы, а
          также качественную уходовую и декоративную косметику. Наши
          консультанты с радостью помогут подобрать продукты исходя из Ваших
          предпочтений и особенностей.{' '}
        </p>
        {/*<ul className={classes.List}>*/}
        {/*  <li className={classes.Item}>*/}
        {/*    <Image*/}
        {/*      src="/assets/img/about/about2.jpg"*/}
        {/*      alt=""*/}
        {/*      width={112}*/}
        {/*      height={112}*/}
        {/*    />*/}
        {/*  </li>*/}
        {/*  <li className={classes.Item}>*/}
        {/*    <Image*/}
        {/*      src="/assets/img/about/about3.jpg"*/}
        {/*      alt=""*/}
        {/*      width={112}*/}
        {/*      height={112}*/}
        {/*    />*/}
        {/*  </li>*/}
        {/*  <li className={classes.Item}>*/}
        {/*    <Image*/}
        {/*      src="/assets/img/about/about4.jpg"*/}
        {/*      alt=""*/}
        {/*      width={112}*/}
        {/*      height={112}*/}
        {/*    />*/}
        {/*  </li>*/}
        {/*  <li className={classes.Item}>*/}
        {/*    <Image*/}
        {/*      src="/assets/img/about/about5.jpg"*/}
        {/*      alt=""*/}
        {/*      width={112}*/}
        {/*      height={112}*/}
        {/*    />*/}
        {/*  </li>*/}
        {/*</ul>*/}
      </ModalContent>
      <ModalBack onClick={() => dispatch(toMainMenu())} />
      {/*<ModalFooter>*/}

      {/*  <Button*/}
      {/*    type="button"*/}
      {/*    className={classes.CloseButton}*/}
      {/*    size={100}*/}
      {/*    background="transparent"*/}
      {/*    color="black"*/}
      {/*    onClick={() => dispatch(toMainMenu())}*/}
      {/*  >Назад</Button>*/}
      {/*</ModalFooter>*/}
    </>
  )
}

export default About
