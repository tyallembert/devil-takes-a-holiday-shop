"use client";
import { MyCartProvider, useMyCart } from '@/_context/MyCart';
import styles from './Cart.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineClose } from "react-icons/md";
import { GiBullHorns } from "react-icons/gi";

const Cart = () => {
  return (
    <MyCartProvider>
      <CartComponent />
    </MyCartProvider>
  );

}
export default Cart;

const CartComponent = () => {
  const [showingCart, setShowingCart] = useState(false);
  const { lines, numLines, fetchCart, removeItem } = useMyCart();
  useEffect(() => {
    fetchCart();
  }, []);
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
            <p className={styles.numLines}>{numLines}</p>
            <FaShoppingCart />
          </button>
        ): (
          <>
          <button className={styles.closeButton} onClick={()=>setShowingCart(false)}>
            <MdOutlineClose />
          </button>
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
                      <button className={styles.quantityButton}>-</button>
                      <p className={styles.quantity}>{line.quantity}</p>
                      <button className={styles.quantityButton}>+</button>
                    </div>
                    <p className={styles.price}>{convertCurrency(line.currencyCode)}{line.price}</p>
                    <button className={styles.removeItem} onClick={() => removeItem(line.id)}>X</button>
                  </li>
                )
              })
            }
          </ul>
          <div className={styles.summaryContainer}>
            <div className={styles.totalContainer}>
              <p>Total:</p>
              <p></p>
            </div>
            <button className={styles.checkoutButton}>
              <p>Checkout</p>
              <GiBullHorns className={styles.horns}/>
            </button>
          </div>
          </>
        )
      }
    </div>
  );
}
// export function CartSection() {
//   const cart = useCart();

//   return (
//     <section>
//       <ul role="list" className="-my-6 mb-2 divide-y divide-gray-200">
//         {cart.lines?.map((line) => (
//           <li key={line?.id} className="flex py-6">
//             <CartLineProvider line={line}>
//               <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                 <NextImage
//                   src={line?.merchandise?.image?.url}
//                   alt={line?.merchandise?.image?.altText || ''}
//                   width={line?.merchandise?.image?.width}
//                   height={line?.merchandise?.image?.height}
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>

//               <div className="ml-4 flex flex-1 flex-col">
//                 <div>
//                   <div className="flex justify-between text-base font-medium text-gray-900">
//                     <h3>
//                       <NextLink href={'/products/' + line?.merchandise?.product?.handle}>
//                         {line?.merchandise?.product?.title}
//                       </NextLink>
//                     </h3>
//                     <Money className="ml-4" data={line?.cost?.totalAmount}></Money>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-500">
//                     {line?.merchandise?.selectedOptions?.map((option, index) => (
//                       <span key={option?.name}>
//                         {index ? ' / ' : ''}
//                         {option?.value}
//                       </span>
//                     ))}
//                   </p>
//                 </div>

//                 <div className="flex flex-1 items-end justify-between text-sm">
//                   <div className="text-gray-500">
//                     Qty <CartLineQuantity></CartLineQuantity>
//                   </div>

//                   <div className="flex">
//                     <CartLineQuantityAdjustButton
//                       className="font-medium text-indigo-600 hover:text-indigo-500"
//                       adjust="remove"
//                     >
//                       Remove
//                     </CartLineQuantityAdjustButton>

//                     {/* <CartLineQuantityAdjustButton adjust="increase">Increase</CartLineQuantityAdjustButton>
//               <CartLineQuantityAdjustButton adjust="decrease">Decrease</CartLineQuantityAdjustButton> */}
//                   </div>
//                 </div>
//               </div>
//             </CartLineProvider>
//           </li>
//         ))}
//       </ul>

//       <div className="border-t border-gray-200 pt-4">
//         <div className="flex justify-between text-base font-medium text-gray-900">
//           <p>Subtotal</p>
//           <div>
//             <CartCost amountType="subtotal" />
//           </div>
//         </div>
//         <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//         <div className="mt-6 flex">
//           <CartCheckoutButton className="flex-1 rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
//             Checkout
//           </CartCheckoutButton>
//         </div>
//         <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//           <p>
//             <span>or</span>
//             <span> </span>
//             <NextLink href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Continue Shopping
//               <span aria-hidden="true"> &rarr;</span>
//             </NextLink>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }