import React from 'react'
import styles from '@/styles/addcart.module.css'
import { useCart } from '@/hooks/use-cart'
// 訊息會話盒，需要先安裝套件
// npm i sweetalert2 sweetalert2-react-content
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import indexcss from '@/styles/index.module.css'
import Link from 'next/link'


export default function CartList() {
  const {
    items,
    totalPrice,
    totalQty,
    handleDecrease,
    handleIncrease,
    handleRemove,
  } = useCart()

  // 以下將用MySwal取代Swal來實作
  const MySwal = withReactContent(Swal)

  // 確認後進行刪除的對話盒
  const notifyAndRemove = (productName, productId) => {
    MySwal.fire({
      title: '你確定嗎?',
      text: '你將無法回復這個操作!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + ' 已從購物車中刪除',
          icon: 'success',
        })
        // 作刪除的動作
        handleRemove(productId)
      }
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cart}>
          <div className={styles.little}>
            <p>購物車目前共有？件商品</p>
          </div>
          <div className={styles.listnav}>

            <p>商品</p>
            <p>品名</p>
            <p>數量</p>
            <p>價格</p>
            <p>操作</p>
          </div>

          <div className={styles.ul}>
            <ul>
              {items.map((v, i) => {
                return (
                  <li key={v.p_id} className={styles.list}>
                    <div className={styles['w-400']}>{v.p_name}</div>
                    <div>
                      <button
                        onClick={() => {
                          const maxQty = 10
                          // 先計算當使用者按下+按鈕時，商品數量會變為多少
                          const nextQty = v.qty + 1

                          if (nextQty > maxQty) {
                            alert('最多只能購買的數量為10')
                          } else {
                            handleIncrease(v.p_id)
                          }
                        }}
                      >
                        +
                      </button>

                      <span>{v.qty}</span>
                      <button
                        onClick={() => {
                          // 先計算當使用者按下-按鈕時，商品數量會變為多少
                          const nextQty = v.qty - 1
                          // 如果按下後，商品數量 <= 0 則進行刪除
                          if (nextQty <= 0) {
                            // 跳出確認視窗，按下確定才會進行刪除
                            notifyAndRemove(v.p_name, v.p_id)
                            // if (confirm('你確定要刪除此商品?')) {
                            //   handleRemove(v.id)
                            // }
                          } else {
                            // 否則作遞減
                            handleDecrease(v.p_id)
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div>{v.p_discount}</div>

                    <div>
                      <button
                        onClick={() => {
                          // 跳出確認視窗，按下確定才會進行刪除
                          notifyAndRemove(v.p_name, v.p_id)
                          // if (confirm('你確定要刪除此商品?')) {
                          //   handleRemove(v.id)
                          // }
                        }}
                      >
                        移除
                      </button>
                    </div>
                  </li>
                )
              })}

            </ul>
          </div>
        </div>
        <div className={styles.subtotal}>
          <div className={styles.little}>
            <p>小計明細</p>
          </div>
          <div> 商品數量: {totalQty}</div>
          <div> 小計: {totalPrice}</div>
          <div> 運費: 運費將於填寫送貨地址後，於結帳頁顯示。</div>
          <div className={styles.forbutton}>
            <div className={indexcss.buttondiv}>
              <Link href={`/product/lis`}>
                <button className={indexcss.button}>
                  <span>返回商品頁面</span>
                </button>
              </Link>
            </div>
            <div className={indexcss.buttondiv}>
              <button className={indexcss.button}>
                <span>前往結帳</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
