import classes from './FooterBottom.module.scss'

function FooterBottom() {
  return (
    <div className={classes.Bottom}>
      <div className={classes.Left}>
        <p className={classes.Copyright}>La Cite &copy; 2023</p>
      </div>
      <div className={classes.Divider} />
      <div className={classes.Right}>
        <p className={classes.Developer}>
          <a
            href="https://bobo.tj?utm_source=lacite"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/img/developer.svg"
              alt="Created by BO/BO"
            />
          </a>
        </p>
      </div>
    </div>
  )
}

export default FooterBottom
