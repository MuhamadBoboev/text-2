import React from 'react'
import GuaranteesGroup from '@components/Layout/Navigation/pages/GuaranteesGroup/GuaranteesGroup'
import Guarantees from '@components/Layout/Navigation/pages/GuaranteesGroup/Guarantees/Guarantees'
import Payment from '@components/Layout/Navigation/pages/GuaranteesGroup/Payment/Payment'
import Delivery from '@components/Layout/Navigation/pages/GuaranteesGroup/Delivery/Delivery'
import Contacts from '@components/Layout/Navigation/pages/Contacts/Contacts'
import Stores from '@components/Layout/Navigation/pages/Contacts/Stores/Stores'
import About from '@components/Layout/Navigation/pages/About/About'
import Purchase from '@components/Layout/Navigation/pages/Purchase/Purchase'
import { useAppSelector } from '@store/hooks'
import { selectMenu } from '@store/selectors/menu'

function NavigationList() {
  const {
    pages: { deliveryGroup, contacts, about, purchase },
  } = useAppSelector(selectMenu)

  return (
    <>
      {deliveryGroup.main && <GuaranteesGroup />}
      {deliveryGroup.guarantees && <Guarantees />}
      {deliveryGroup.payment && <Payment />}
      {deliveryGroup.delivery && <Delivery />}
      {contacts.main && <Contacts />}
      {contacts.addresses && <Stores />}
      {about && <About />}
      {purchase.main && <Purchase />}
    </>
  )
}

export default NavigationList
