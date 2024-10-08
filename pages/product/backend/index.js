import React, { useEffect, useState } from 'react'

import BeNavbar from '@/components/layout/default-layout/backendbar'
import { useRouter } from 'next/router'

import style from '@/styles/productbackend.module.css'
import { symbol } from 'prop-types'

export default function ProductList() {
  // 存放載入進來的資料的狀態

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0) //總筆數
  const [pageCount, setPageCount] = useState(0) //總頁數
  // 分頁用
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(16)

  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list'
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseURL}?${qs}`

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.products)) {
          setProducts(resData.data.products)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // 這裡可以確保一定可以得到router.query的值
      console.log(router.query)
      // 向伺服器要求資料

      // 建立查詢字串用的參數值
      const params = {
        page,
        perpage,
      }

      // 向伺服器要求資料
      getProducts(params)
    }
  }, [])

  return (
    <>
      <BeNavbar title="首頁 - 後臺管理"></BeNavbar>
      <h1>Home</h1>
      <div className="container">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>原價</th>
              <th>折價後價格</th>
              <th>種類</th>
              <th>產地</th>
              <th>品種</th>
              <th>處理法</th>
              <th>烘焙法</th>
              <th>介紹</th>
              <th>庫存</th>
              <th>銷量</th>
              <th>商品照片</th>
              <th>上架日期</th>
            </tr>
          </thead>
          <tbody>
            {products.map((r) => {
              return (
                <tr key={r.p_id}>
                  <td>{r.p_id}</td>
                  <td className={style.td}>{r.p_name}</td>
                  <td>{r.p_price}</td>
                  <td>{r.p_discount}</td>
                  <td>{r.p_type}</td>
                  <td>{r.p_country}</td>
                  <td>{r.p_breed}</td>
                  <td>{r.p_process}</td>
                  <td>{r.p_roast}</td>
                  <td>
                    <p className={style.intro}>{r.p_intro}</p>
                  </td>
                  <td>{r.p_stock}</td>
                  <td>{r.p_sold}</td>
                  <td>
                    <img width={150} src={`../img/${r.p_pic1}`} alt="" />
                  </td>
                  <td>{r.p_data}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
