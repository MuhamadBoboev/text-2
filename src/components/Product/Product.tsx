import classes from './Product.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import { IProduct } from '@models/product/IProduct'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import HTMLReactParser from 'html-react-parser'
import Button from '@ui/Button/Button'
import { HandySvg } from 'handy-svg'
import ProductPictures from '@components/Product/ProductPictures/ProductPictures'
import ProductCounter from '@ui/ProductCounter/ProductCounter'
import { useEffect, useMemo, useState } from 'react'
import { fetchProduct } from '@store/reducers/browsedSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  addToCart,
  changeAttributesProductCart,
  changeQuantityProductCart,
  removeFromCart,
} from '@store/reducers/cartSlice/helpers'
import Tag from '@ui/Tag/Tag'
import clsx from 'clsx'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'
import Link from 'next/link'
import { openFeedback } from '@store/reducers/feedbackSlice'
import Accordion from '@ui/Accordion/Accordion'
import Divider from '@ui/Divider/Divider'
import Volume from '@ui/attributes/Volume/Volume'
import Size from '@ui/attributes/Size/Size'
import Colors from '@ui/attributes/Colors/Colors'
import {
  openMenu,
  toMenuAddresses,
  toMenuDelivery,
} from '@store/reducers/menuSlice'
import { addToFavorite } from '@store/reducers/favoriteSlice/helpers'
import { CartLocalKey, openCart } from '@store/reducers/cartSlice'
import { sortObjectKeys } from '@utils/helpers/sortObjectKeys'

interface ProductProps extends IProduct {}

function Product({
  categories,
  brand,
  name,
  price,
  id,
  description,
  status,
  image,
  images,
  quantity,
  sku,
  slug,
  discount,
  discount_percent,
  compound,
  characteristics,
  attributes,
  product_type_id,
  categories_tree,
  is_only_on_retail_store,
  ...keys
}: ProductProps) {
  const dispatch = useAppDispatch()

  const [counter, setCounter] = useState<number>(1)
  const breadcrumb: breadcrumbType[] = [{ text: 'Главная', link: '/' }]

  if (categories_tree.main_category) {
    breadcrumb.push({
      text: categories_tree.main_category.name,
      link: `/products?main_category_id=${categories_tree.main_category.id}`,
    })
  }
  if (categories_tree?.category) {
    breadcrumb.push({
      text: categories_tree.category.name,
      link: `/products?category_id=${categories_tree.category.id}`,
      isActive: !categories_tree?.subcategory,
    })
  }
  // if (categories_tree?.subcategory) {
  //   breadcrumb.push({
  //     text: categories_tree.subcategory.name,
  //     link: `/products?categories=${categories_tree.subcategory.id}`,
  //     isActive: true
  //   })
  // }

  const { products } = useAppSelector((state) => state.cart)

  // const volumes = useMemo(() => attributes.filter(attribute => attribute.type.slug === 'obyom').sort((a, b) => parseFloat(a.name) > parseFloat(b.name) ? 1 : -1), [attributes])
  const volumes = attributes
    .filter((attribute) => attribute.type.slug === 'obyom')
    .sort((a, b) => (parseFloat(a.name) > parseFloat(b.name) ? 1 : -1))
  // const sizes = useMemo(() => attributes.filter(attribute => attribute.type.slug === 'size').sort((a, b) => parseFloat(a.name) > parseFloat(b.name) ? 1 : -1), [attributes])
  const sizes = attributes
    .filter((attribute) => attribute.type.slug === 'size')
    .sort((a, b) => (parseFloat(a.name) > parseFloat(b.name) ? 1 : -1))
  // const colors = useMemo(() => attributes.filter(attribute => attribute.type.slug === 'color').sort((a, b) => parseFloat(a.name) > parseFloat(b.name) ? 1 : -1), [attributes])
  const colors = attributes
    .filter((attribute) => attribute.type.slug === 'color')
    .sort((a, b) => (parseFloat(a.name) > parseFloat(b.name) ? 1 : -1))

  const firstVolume = volumes.find((attribute) => {
    return attribute.quantity > 0 && attribute.type.slug === 'obyom'
  })
  const firstSize = sizes.find(
    (attribute) => attribute.type.slug === 'size' && attribute.quantity > 0,
  )
  const firstColor = colors.find(
    (attribute) => attribute.type.slug === 'color' && attribute.quantity > 0,
  )

  const [activeVolume, setActiveVolume] = useState<number | undefined>(
    firstVolume?.id,
  )
  const [activeSize, setActiveSize] = useState<number | undefined>(
    firstSize?.id,
  )
  const [activeColor, setActiveColor] = useState<number | undefined>(
    firstColor?.id,
  )

  useEffect(() => {
    setActiveVolume(firstVolume?.id)
    setActiveSize(firstSize?.id)
    setActiveColor(firstColor?.id)
  }, [firstVolume, firstColor, firstSize])

  // const volume = useMemo(() => volumes.find(attribute => attribute.id === activeVolume), [activeVolume])
  const volume = volumes.find((attribute) => attribute.id === activeVolume)
  // const size = useMemo(() => sizes.find(attribute => attribute.id === activeSize), [activeSize])
  const size = sizes.find((attribute) => attribute.id === activeSize)
  // const color = useMemo(() => colors.find(attribute => attribute.id === activeColor), [activeColor])
  const color = colors.find((attribute) => attribute.id === activeColor)

  useEffect(() => {
    dispatch(fetchProduct(slug))
  }, [])

  const [isOpenDescription, setIsOpenDescription] = useState(false)
  const productKey: CartLocalKey = sortObjectKeys({
    id,
    selectedSize: activeSize,
    selectedVolume: activeVolume,
    selectedColor: activeColor,
  })
  useEffect(() => {
    dispatch(changeQuantityProductCart({ key: productKey, quantity: counter }))
  }, [counter])

  useEffect(() => {
    dispatch(
      changeAttributesProductCart({
        slug,
        attributes: {
          selectedColor: color?.id,
          selectedSize: size?.id,
          selectedVolume: volume?.id,
        },
      }),
    )
  }, [volume, size, color])

  const foundedInCart = products.find((product) => {
    const productKey: CartLocalKey = sortObjectKeys({
      id: product.id,
      selectedVolume: activeVolume,
      selectedSize: activeSize,
      selectedColor: activeColor,
    })
    const cartKey: CartLocalKey = sortObjectKeys({
      id: product.id,
      selectedColor: product.selectedColor,
      selectedSize: product.selectedSize,
      selectedVolume: product.selectedVolume,
    })
    return JSON.stringify(productKey) === JSON.stringify(cartKey)
  })

  const hasInCart = Boolean(foundedInCart)

  useEffect(() => {
    if (foundedInCart) {
      setCounter(foundedInCart.selectedQuantity)
    }
  }, [activeVolume, activeColor, activeSize, foundedInCart])

  const addFavorite = () => {
    dispatch(
      addToFavorite({
        categories,
        brand,
        name,
        price,
        id,
        description,
        status,
        image,
        images,
        quantity,
        sku,
        slug,
        discount,
        discount_percent,
        compound,
        characteristics,
        attributes,
        product_type_id,
        categories_tree,
        is_only_on_retail_store,
        ...keys,
      }),
    )
  }

  const descriptionLength = description?.length

  let descriptionText: string = ''
  const countChar = 200

  if (descriptionLength >= countChar) {
    descriptionText = description?.substring(0, countChar) + '...'
  } else {
    descriptionText = description
  }

  const productTypes: any = {
    2: 'Хит',
    4: 'Новинка',
  }

  const productTagColor: any = {
    2: 'hit',
    4: 'new',
  }

  function checkQuantity() {
    if (volume || color || size) {
      // @ts-ignore
      return (
        (volume?.quantity || color?.quantity || size?.quantity || false) > 0
      )
    } else {
      return quantity > 0
    }
  }

  return (
    <article className={classes.Product}>
      <Wrapper className={classes.Wrapper}>
        <ProductPictures
          addFavorite={addFavorite}
          title={name}
          mainImg={image}
          images={images}
          price={price}
          id={id}
          description={description}
          name={name}
          image={image}
          categories={categories}
          status={status}
          attributes={attributes}
          brand={brand}
          sku={sku}
          slug={slug}
          quantity={quantity}
          discount_percent={discount_percent}
          discount={discount}
          product_type_id={product_type_id}
          categories_tree={categories_tree}
          is_only_on_retail_store={is_only_on_retail_store}
          {...keys}
        />
        <div className={classes.Right}>
          <div className={classes.Top}>
            {
              <Breadcrumbs
                className={classes.Breadcrumbs}
                list={breadcrumb}
              />
            }

            <div className={classes.BrandAndTags}>
              {!Array.isArray(brand) && brand && (
                <Link
                  href={`/products?brands=${brand.id}`}
                  className={classes.Brand}
                >
                  {brand.name}
                </Link>
              )}
              <div className={classes.Tags}>
                {discount_percent !== null && discount_percent > 0 && (
                  <Tag
                    className={classes.Tag}
                    color="red"
                  >
                    -{discount_percent}%
                  </Tag>
                )}
                {discount && (
                  <Tag
                    className={classes.Tag}
                    color="promotion"
                  >
                    {discount.name}
                  </Tag>
                )}
                {product_type_id && productTypes[product_type_id] && (
                  <Tag
                    className={classes.Tag}
                    color={productTagColor[product_type_id]}
                  >
                    {productTypes[product_type_id]}
                  </Tag>
                )}
              </div>
            </div>
          </div>
          <div className={classes.NameAndPrice}>
            <H2 className={classes.Title}>
              {brand?.name ? `${brand.name} ` : null}
              {name}
            </H2>

            <div className={classes.Prices}>
              <div className={classes.PricesWrapper}>
                {discount_percent !== null && discount_percent > 0 && (
                  <p className={classes.Price}>
                    {`${Math.floor(calculateDiscount(color?.price || size?.price || volume?.price || price, discount_percent))} с.`}
                  </p>
                )}
                <p
                  className={clsx(
                    classes.Price,
                    discount_percent && classes.Strike,
                  )}
                >{`${Math.floor(color?.price || size?.price || volume?.price || price)} с.`}</p>
              </div>
              <div className={classes.TagsMobile}>
                {!Array.isArray(brand) && brand && (
                  <Link
                    href={`/products?brands=${brand.id}`}
                    className={classes.BrandMobile}
                  >
                    {brand.name}
                  </Link>
                )}
                {discount_percent !== null && discount_percent > 0 && (
                  <Tag
                    className={classes.Tag}
                    color="red"
                  >
                    -{discount_percent}%
                  </Tag>
                )}
                {discount && (
                  <Tag
                    className={classes.Tag}
                    color="promotion"
                  >
                    {discount.name}
                  </Tag>
                )}
                {product_type_id && productTypes[product_type_id] && (
                  <Tag
                    className={classes.Tag}
                    color={productTagColor[product_type_id]}
                  >
                    {productTypes[product_type_id]}
                  </Tag>
                )}
              </div>
            </div>
          </div>
          <p className={classes.Code}>{`Артикул ${sku}`}</p>
          <div>
            {description && (
              <div
                className={clsx(
                  classes.Description,
                  descriptionLength < countChar && classes.ShowDescription,
                  isOpenDescription
                    ? classes.DescriptionHide
                    : classes.DescriptionShow,
                )}
                onClick={() => {
                  if (descriptionLength >= countChar) {
                    setIsOpenDescription(!isOpenDescription)
                  }
                }}
              >
                {HTMLReactParser(
                  isOpenDescription ? description : descriptionText,
                )}
              </div>
            )}
          </div>

          {!is_only_on_retail_store && (
            <div className={classes.Panels}>
              {(activeVolume || activeSize || activeColor) && (
                <div className={classes.Attributes}>
                  {activeColor && (
                    <Colors
                      colors={colors}
                      activeColor={activeColor}
                      setActiveColor={setActiveColor}
                      className={clsx(classes.Attribute, classes.Colors)}
                    />
                  )}
                  {activeVolume && (
                    <Volume
                      volumes={volumes}
                      activeVolume={activeVolume}
                      setActiveVolume={setActiveVolume}
                      className={classes.Attribute}
                    />
                  )}
                  {activeSize && (
                    <Size
                      sizes={sizes}
                      activeSize={activeSize}
                      setActiveSize={setActiveSize}
                      className={classes.Attribute}
                    />
                  )}
                </div>
              )}
              <div className={classes.Counter}>
                <p className={classes.CounterTitle}>Количество</p>
                <ProductCounter
                  counter={counter}
                  setCounter={setCounter}
                  max={
                    color?.quantity ||
                    size?.quantity ||
                    volume?.quantity ||
                    quantity
                  }
                />
              </div>
            </div>
          )}

          <div className={classes.InfoTablet}>
            <dl className={classes.InfoList}>
              <div>
                <dt>Артикул</dt>
                <dd>{sku}</dd>
              </div>
              {brand && (
                <div>
                  <dt>Бренд</dt>
                  <dd className={classes.InfoBrand}>
                    <Link href={`/products?brands=${brand.id}`}>
                      {brand.name}
                    </Link>
                  </dd>
                </div>
              )}
              {discount_percent !== null && discount_percent > 0 && (
                <div>
                  <dt>Цена со скидкой {discount_percent}%</dt>
                  <dd className={classes.InfoDiscount}>
                    {Math.floor(
                      calculateDiscount(
                        color?.price || size?.price || volume?.price || price,
                        discount_percent,
                      ),
                    )}{' '}
                    сомони
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {checkQuantity() && (
            <>
              {!is_only_on_retail_store && (
                <Button
                  size={100}
                  className={classes.BuyButton}
                  onClick={() => {
                    dispatch(
                      addToCart({
                        categories,
                        selectedQuantity: counter,
                        selectedVolume: volume?.id,
                        selectedColor: color?.id,
                        selectedSize: size?.id,
                        brand,
                        name,
                        price,
                        id,
                        attributes,
                        description,
                        status,
                        image,
                        images,
                        quantity,
                        sku,
                        slug,
                        discount,
                        discount_percent,
                        compound,
                        characteristics,
                        product_type_id,
                        is_only_on_retail_store,
                        categories_tree,
                        ...keys,
                      }),
                    )
                    dispatch(openCart())
                  }}
                >
                  Купить
                </Button>
              )}
              {!is_only_on_retail_store && (
                <Button
                  size={100}
                  className={classes.ToCart}
                  background="transparent"
                  withBorder="black"
                  color="black"
                  onClick={() => {
                    if (!hasInCart) {
                      dispatch(
                        addToCart({
                          categories,
                          selectedQuantity: counter,
                          selectedVolume: volume?.id,
                          selectedColor: color?.id,
                          selectedSize: size?.id,
                          brand,
                          name,
                          price,
                          id,
                          attributes,
                          description,
                          status,
                          image,
                          images,
                          quantity,
                          sku,
                          slug,
                          discount,
                          discount_percent,
                          compound,
                          characteristics,
                          is_only_on_retail_store,
                          product_type_id,
                          categories_tree,
                          ...keys,
                        }),
                      )
                    } else {
                      dispatch(removeFromCart(productKey))
                    }
                  }}
                >
                  {hasInCart ? 'Убрать' : 'В корзину'}
                </Button>
              )}
            </>
          )}
          {!is_only_on_retail_store && (
            <p
              className={`${classes.ProductStatus} ${checkQuantity() ? classes.Green : classes.Red}`}
            >
              {checkQuantity() ? 'Товар в наличии' : 'Товар не доступен'}
            </p>
          )}

          {!!is_only_on_retail_store && (
            <Button
              size={100}
              className={classes.BuyButton}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuAddresses())
              }}
            >
              Адреса наших магазинов
            </Button>
          )}

          {!!is_only_on_retail_store && (
            <p className={clsx(classes.ProductStatus, classes.Green)}>
              Товар доступен только в розничном магазине
            </p>
          )}

          <ul className={classes.Advantages}>
            <li
              className={classes.Advantage}
              onClick={() => {
                dispatch(openFeedback())
              }}
            >
              <HandySvg
                className={classes.AdvantageIcon}
                src="/assets/icons/help.svg"
                width={20}
                height={20}
              />
              <p className={classes.AdvantageTitle}>Задать вопрос</p>
              <p className={classes.AdvantageDescription}>
                Наш эксперт ответит на ваши вопросы
              </p>
            </li>
            <li
              className={classes.Advantage}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuDelivery())
              }}
            >
              <HandySvg
                className={classes.AdvantageIcon}
                src="/assets/icons/delivery.svg"
                width={20}
                height={20}
              />
              <p className={classes.AdvantageTitle}>Доставка</p>
              <p className={classes.AdvantageDescription}>
                Есть два варианта доставки
              </p>
            </li>
            <li
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuAddresses())
              }}
              className={classes.Advantage}
            >
              <HandySvg
                className={classes.AdvantageIcon}
                src="/assets/icons/store.svg"
                width={20}
                height={20}
              />
              <p className={classes.AdvantageTitle}>Самовывоз</p>
              <p className={classes.AdvantageDescription}>
                Забрать товар из пункотов выдачи
              </p>
            </li>
          </ul>
          <Divider className={classes.Divider} />
          <div className={classes.Info}>
            {description && (
              <Accordion
                className={classes.DescriptionAccordion}
                title="Описание товара"
              >
                {HTMLReactParser(description || '')}
              </Accordion>
            )}
            {compound && (
              <Accordion title="Состав">{HTMLReactParser(compound)}</Accordion>
            )}
            {characteristics && (
              <Accordion title="Характеристика">
                {HTMLReactParser(characteristics)}
              </Accordion>
            )}
            {brand?.description && (
              <Accordion title="Информация о бренде">
                {HTMLReactParser(brand?.description)}
              </Accordion>
            )}
          </div>
        </div>
      </Wrapper>
    </article>
  )
}

export default Product
