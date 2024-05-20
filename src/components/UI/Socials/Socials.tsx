import classes from './Socials.module.scss'
import { socialList } from '@utils/constants/socialList'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'

interface SocialsProps {
  width?: 16 | 24
}

function Socials({ width = 16 }: SocialsProps) {
  return (
    <ul className={classes.List}>
      {socialList.map(({ url, name, icon }) => (
        <li
          className={clsx(classes.Item, width === 24 && classes.BigIcon)}
          key={name}
        >
          <a
            title={name}
            href={url}
            target="_blank"
          >
            <HandySvg
              src={icon}
              width={width}
              height={width}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Socials
