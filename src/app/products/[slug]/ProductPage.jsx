"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from './productDetails.module.scss';
import { MyCartProvider, useMyCart } from '@/_context/MyCart';
import Cart from '@/app/_components/Cart';

const ProductPage = ({productDetails}) => {
    return (
        <MyCartProvider>
            <ProductDetailsComponent productDetails={productDetails}/>
        </MyCartProvider>
    )
}

export default ProductPage

const ProductDetailsComponent = ({productDetails}) => {
    const { addToCart, lines } = useMyCart();
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        productInCart();
    }, [lines])

    const productInCart = () => {
        let prodInCart = false;
        lines.forEach((line) => {
            console.log("Is in cart: ", line.merchandiseId === productDetails.variantId)
            if(productDetails.variantId === line.merchandiseId) {
                prodInCart = true;
            }
        });
        setInCart(prodInCart);
    }
    return (
        <main className={styles.detailsContainer}>
            <Cart />
            <button className={styles.backButton} onClick={() => window.history.back()}>Back</button>
            <div className={styles.imageContainer}>
                <Image src={productDetails.imageSRC} 
                alt={productDetails.altText} 
                width={300} 
                height={500}
                priority/>
                <div className={styles.backgroundShape1}></div>
                <div className={styles.backgroundShape2}></div>
            </div>
            <div className={styles.infoContainer}>
                <h2 className={styles.productTitle}>{productDetails.title}</h2>
                <p className={styles.productPrice}>${productDetails.price}</p>
                <p className={styles.productDescription}>{productDetails.description}</p>
                {
                    inCart ? (
                        <button className={styles.alreadyInCart}>Already in Cart</button>
                    ): (
                    <button className={styles.addToCartButton} onClick={() => addToCart({
                    quantity: 1,
                    merchandiseId: productDetails.variantId,
                    })}>Add to Cart</button>
                    )
                }
                <button className={styles.checkoutButton} >Checkout</button>
            </div>
        </main>
    )
}