import classes from './PromotionsAndSuggestionsLite.module.scss'
import H2 from '@ui/Typography/H2/H2'
import Button from '@ui/Button/Button'
import Wrapper from '@ui/Wrapper/Wrapper'
import Divider from '@ui/Divider/Divider'
import Link from 'next/link'
import Tag from '@ui/Tag/Tag'
import { HTMLAttributes } from 'react'

interface PromotionsAndSuggestionsProps extends HTMLAttributes<HTMLElement> {
  className?: string
}

function PromotionsAndSuggestionsLite({
  className,
}: PromotionsAndSuggestionsProps) {
  return null

  // return (
  //   <section className={`${classes.Section} ${className ||''}`}>
  //     <Wrapper>
  //       <header className={classes.Header}>
  //         <H2 className={classes.Title}>Акции и спец. предложения</H2>
  //         <Button
  //           className={classes.Button}
  //           tagName="link"
  //           color="black"
  //           href="/promotions"
  //           background="more"
  //         >
  //           Товары по акции
  //         </Button>
  //       </header>
  //       <Divider className={classes.Divider}/>
  //       <ul className={classes.List}>
  //         {promotionList.map(({img, title, link}, index) => (
  //           <li key={index} className={classes.Item}>
  //             <Link href={link} className={classes.Link}>
  //               <picture>
  //                 {img.webp && (
  //                   <source
  //                     type="image/webp"
  //                     srcSet={img.webp}
  //                   />
  //                 )}
  //                 <img
  //                   className={classes.Img}
  //                   src={img.jpg}
  //                   alt={title}
  //                   width={240}
  //                   height={240}
  //                 />
  //               </picture>
  //               <Tag className={classes.Info} color="green">{title}</Tag>
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //       <Divider className={classes.DividerBottom}/>
  //     </Wrapper>
  //   </section>
  // )
}

export default PromotionsAndSuggestionsLite
