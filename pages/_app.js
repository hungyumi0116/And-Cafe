import { useState, useEffect } from 'react'
import '@/styles/globals.scss'
import DefaultLayout from '@/components/layout/default-layout'
import { CartProvider } from '@/hooks/use-cart'
import { AuthContextProvider } from '@/contexts/auth-context'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return <AuthContextProvider> <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider></AuthContextProvider>
}