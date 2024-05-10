"use client";
import React from 'react'
import Image from 'next/image';
import styles from './productDetails.module.scss';
import { MyCartProvider, useMyCart } from '@/_context/MyCart';

const ProductPage = ({productDetails}) => {
    return (
        <MyCartProvider>
            <ProductDetailsComponent productDetails={productDetails}/>
        </MyCartProvider>
    )
}

export default ProductPage

const ProductDetailsComponent = ({productDetails}) => {
    const { addToCart } = useMyCart();
       
    return (
        <main className={styles.detailsContainer}>
            <button className={styles.backButton} onClick={() => window.history.back()}>Back</button>
            <div className={styles.imageContainer}>
                <Image src={productDetails.imageSRC} alt={productDetails.altText} width={300} height={500}/>
                <div className={styles.backgroundShape1}></div>
                <div className={styles.backgroundShape2}></div>
            </div>
            <div className={styles.infoContainer}>
                <h2 className={styles.productTitle}>{productDetails.title}</h2>
                <p className={styles.productPrice}>${productDetails.price}</p>
                <h2>Item ID: {productDetails.variantId}</h2>
                <p className={styles.productDescription}>{productDetails.description}</p>
                <button className={styles.addToCartButton} onClick={() => addToCart({
                quantity: 1,
                merchandiseId: productDetails.variantId,
                })}>Add to Cart</button>
            </div>
        </main>
    )
}