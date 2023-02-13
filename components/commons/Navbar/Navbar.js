import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUI, SIDEBAR_VIEWS } from 'components/UIcontext'
import { useCommerce } from 'components/CommerceContext'
import { useCart } from 'hooks/useCart'
import { authChanged } from 'firebaseApi/auth/userState'
import Link from 'next/link'

import Image from 'next/image'
import Hamburger from 'hamburger-react'
import UserLoadingIcon from 'components/icons/UserLoading-Icon'
import { CloseIcon, ShoppingBagIcon } from 'components/icons'
import UserIcon from 'components/icons/User-Icon'
import koiBagBig from 'public/images/logos/koi-bag-big.png'
import styles from './Style-Navbar'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

const Navbar = () => {
  const {
    displaySidebarRight,
    displaySidebarLeft,
    openSidebarFromRight,
    openSidebarFromLeft,
    closeSidebar,
    openModal,
    userAvatar,
    setUser,
    email,
    setSidebarView
  } = useUI()
  const router = useRouter()

  const { totalProductsInCart } = useCommerce()
  const { getProductsAtFrist } = useCart()

  getProductsAtFrist()

  useEffect(() => {
    authChanged(setUser)
  }, [])

  const openRightSidebar = (cb = function () {}) => {
    if (displaySidebarRight && screen.width < 768) {
      closeSidebar()
    } else {
      cb()
      openSidebarFromRight()
    }
  }

  const handlerClickCar = () => {
    if (router.pathname === '/pagar') {
      closeSidebar()
      return false
    }

    openRightSidebar(() => {
      setSidebarView(SIDEBAR_VIEWS.CART_VIEW)
    })
  }

  const openHamburger = (toggled) => {
    if (toggled) {
      setSidebarView(SIDEBAR_VIEWS.HAMBURGER)
      openSidebarFromLeft()
    } else {
      closeSidebar()
    }
  }

  const openCategories = () => {
    if (!displaySidebarLeft) {
      setSidebarView(SIDEBAR_VIEWS.HAMBURGER)
      openSidebarFromLeft()
    } else {
      closeSidebar()
    }
  }

  const openModalUi = () => {
    openModal()
    closeSidebar()
  }

  const handlerUserSideBar = () => {
    openRightSidebar(() => {
      setSidebarView(SIDEBAR_VIEWS.USER)
    })
  }

  const iconUser = (email === 'unknow')
    ? <UserLoadingIcon/>
    : (email === '')
        ? <UserIcon width="42" height="42" onClick={openModalUi} />
        : <Image src={userAvatar} width="42" height="42" onClick={handlerUserSideBar}/>

  return (
        <nav>
            <div className="left-block">
                <Hamburger toggled={displaySidebarLeft} onToggle={toggled => openHamburger(toggled)}/>
                <span className="navbar-categories">
                    <ul>
                        <li>
                            <button onClick={openCategories} className="btn-categories">Categorias</button>
                        </li>
                        <li>
                            <Link href="/"><a>Koi Makeup</a></Link>
                        </li>
                    </ul>
                </span>
            </div>
            <div className="logo-container">
                <Link href="/">
                    <a>
                        <Image
                            src={koiBagBig}
                            className="logo"
                            alt="Home"
                            layout="responsive"
                            width="42"
                            height="42"
                        />
                    </a>
                </Link>
            </div>
            <div className="right-block">
                { iconUser }
                <div onClick={handlerClickCar} className="car-close-container">
                          <CloseIcon width="42" height="42" className={`car-close__btn car-close__btn--${displaySidebarRight}`}/>
                          <div className={`shoppingbag-btn shoppingbag-btn--${displaySidebarRight}`}>
                            <ShoppingBagIcon width="42" height="42"/>
                            <span className="counter-shoppingbag">
                                {totalProductsInCart === 0 ? '' : totalProductsInCart}
                            </span>
                          </div>
                </div>
            </div>

            <style jsx>{styles}</style>
        </nav>
  )
}

export default Navbar
