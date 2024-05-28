"use client";
import { useMyCart } from '@/_context/MyCart';
import styles from './Cart.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineClose } from "react-icons/md";
import { GiBullHorns } from "react-icons/gi";
import AddAnimation from './AddAnimation';

const Cart = () => {
  const [showingCart, setShowingCart] = useState(false);
  const { lines, numLines, totalCost, checkoutUrl, removeItem, changeQuantity } = useMyCart();
  const convertCurrency = (currencyCode) => {
    switch(currencyCode) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  }

  return (
    <div className={`${styles.cartPageContainer} ${showingCart ? styles.showing: styles.hidden}`}>
      {
        !showingCart ? (
          <button className={styles.cartButton} onClick={()=>setShowingCart(true)}>
            <AddAnimation>
            <p className={styles.numLines}>{numLines}</p>
            <FaShoppingCart />
            </AddAnimation>
          </button>
        ): (
          <>
          <button className={styles.closeButton} onClick={()=>setShowingCart(false)}>
            <MdOutlineClose />
          </button>
          {
            numLines === 0 ? (
              <>
              <h1 className={styles.emptyCartMessage}>Your Cart is Empty</h1>
              <div className={styles.summaryContainer}>
                <button className={styles.checkoutButton} onClick={()=>setShowingCart(false)}>
                  <p>Continue Shopping</p>
                  <GiBullHorns className={styles.horns}/>
                </button>
              </div>
              </>
            ): (
              <>
              <ul className={styles.contentsContainer}>
                {/* <li className={styles.headers}>
                  <p className={styles.product}>Product</p>
                  <p className={styles.title}>Title</p>
                  <p className={styles.quantity}>Quantity</p>
                  <p className={styles.price}>Price</p>
                  <p className={styles.remove}>Remove</p>
                </li> */}
                {
                  lines.map((line) => {
                    return(
                      <li key={line.id} className={styles.lineContainer}>
                        <Image src={line.imageSRC} alt={line.title} className={styles.image} width={100} height={100} />
                        <p className={styles.title}>{line.title}</p>
                        <div className={styles.quantityContainer}>
                          <button className={styles.quantityButton} onClick={() => changeQuantity(line.id, -1)}>-</button>
                          <p className={styles.quantity}>{line.quantity}</p>
                          <button className={styles.quantityButton} onClick={() => changeQuantity(line.id, 1)}>+</button>
                        </div>
                        <p className={styles.price}>{convertCurrency(line.currencyCode)}{Number(line.price).toFixed(2)}</p>
                        <button className={styles.removeItem} onClick={() => removeItem(line.id)}>X</button>
                      </li>
                    )
                  })
                }
              </ul>
              <div className={styles.summaryContainer}>
              <div className={styles.totalContainer}>
                <p>Total:</p>
                <p>{convertCurrency(totalCost.currencyCode)}{Number(totalCost.amount).toFixed(2)}</p>
              </div>
              <a href={checkoutUrl} className={styles.checkoutButton}>
                <p>Checkout</p>
                <GiBullHorns className={styles.horns}/>
              </a>
            </div>
            </>
            )
          }
          </>
        )
      }
    </div>
  );

}
export default Cart;
