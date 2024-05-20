import classes from './Payments.module.scss'

type paymentType = {
  title: string
  icon: {
    src: string
    width: number
    height: number
  }
}

const paymentList: paymentType[] = [
  // {
  //   title: 'Master Card',
  //   icon: {
  //     src: '/assets/icons/payments/master-card.png',
  //     width: 54,
  //     height: 33,
  //   }
  // },
  {
    title: 'Корти милли',
    icon: {
      src: '/assets/icons/payments/korti-milli.png',
      width: 27,
      height: 38,
    },
  },
  // {
  //   title: 'Visa',
  //   icon: {
  //     src: '/assets/icons/payments/visa.png',
  //     width: 86,
  //     height: 28,
  //   }
  // }
]

function Payments() {
  return (
    <ul className={classes.List}>
      {paymentList.map(({ title, icon: { src, height, width } }) => (
        <li
          key={title}
          className={classes.Item}
        >
          <img
            className={classes.Img}
            src={src}
            title={title}
            alt={title}
            width={width}
            height={height}
          />
        </li>
      ))}
    </ul>
  )
}

export default Payments
