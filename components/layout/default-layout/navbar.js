import React, { useState, useEffect } from 'react'
import nav from '@/styles/nav.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router' // 引入 useRouter
import { useCart } from '@/hooks/use-cart' // 引入 useCart
import { PiShoppingCartFill } from "react-icons/pi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { totalQty } = useCart() // 從購物車 hook 中獲取購物車內的商品數量
  const router = useRouter() // 初始化 useRouter

  // 檢查是否已經登入
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus) {
      setIsLoggedIn(true)
    }
  }, [])

  // 切換選單開關
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  // 處理登出
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    setIsLoggedIn(false)
    alert('已登出')
    router.push('/member/login') // 登出後跳轉到登入頁面
  }

  return (
    <>
      <div className={nav.container}>
        <nav className={nav.nav}>
          <Link className={nav.link} href={`/coffee`}>
            <li className={nav.logo}>
              <Image
                src="/&&LOGO.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </li>
          </Link>
          <ul className={nav.ul}>
            <Link className={nav.link} href={`/product/list`}>
              <li className={nav.li}>
                購物商城 <div className={nav.little}>shop</div>
              </li>
            </Link>
            <Link className={nav.link} href={`/member/login`}>
              <li className={nav.li}>
                會員中心 <div className={nav.little}>center</div>
              </li>
            </Link>
            <Link className={nav.link} href={`/store/index`}>
              <li className={nav.li}>
                門市預約 <div className={nav.little}>store</div>
              </li>
            </Link>
            <li className={nav.li}>
              關於我們 <div className={nav.little}>about &&</div>
            </li>
            <Link className={nav.link} href={`/addcart/addcart`}>
            <li className={nav.cartIcon}>
              <div style={{ position: 'relative' }}>
                <Image
                  src="/shopping_cart_light_icon 2.png"
                  alt="Cart Icon"
                  width={40}
                  height={40}
                  priority
                />
                {totalQty > 0 && (
                  <span className={nav.cartQty}>{totalQty}</span>
                )}
              </div>
            </li>
            </Link>
            <li className={nav.icon2} onClick={toggleMenu}>
              <Image
                src="/list_light_icon 2.svg"
                alt="Menu Icon"
                width={40}
                height={40}
                priority
              />
            </li>
            {/* 登入後顯示登出按鈕 */}
            {isLoggedIn && (
              <li className={nav.logoutButton} onClick={handleLogout}>
                <button>登出</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}
