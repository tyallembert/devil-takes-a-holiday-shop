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
    const [options, setOptions] = useState({});

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

    const handleChangeOption = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setOptions((prevOptions) => {
            return {...prevOptions, [name]: value}
        })
    }
    return (
        <main className={styles.detailsContainer}>
            <Cart />
            <button className={styles.backButton} onClick={() => window.history.back()}>Back</button>
            <div className={styles.imageContainer}>
                <Image src={productDetails.images[0].src} 
                alt={productDetails.images[0].alt || "An inventory image"} 
                className={styles.mainImage}
                width={300} 
                height={500}
                priority/>
                <div className={styles.allImagesContainer}>
                    {
                        productDetails.images.map((image) => (
                            <Image src={image.src} 
                            key={image.src}
                            alt={image.alt || "An inventory image"} 
                            width={image.width || 300} 
                            height={image.height || 500}
                            priority />
                        ))
                    }
                </div>
                {/* <div className={styles.backgroundShape1}></div>
                <div className={styles.backgroundShape2}></div> */}
            </div>
            <div className={styles.infoContainer}>
                <h1 className={styles.backgroundTitle}>{productDetails.title}</h1>
                <h2 className={styles.productTitle}>{productDetails.title}</h2>
                <p className={styles.productPrice}>${Number(productDetails.price).toFixed(2)}</p>
                <p className={styles.productDescription}>{productDetails.description}</p>
                {
                    productDetails.options ? (
                        <form className={styles.optionsContainer}>
                        {
                            productDetails.options.map((option, index) => (
                                <div className={styles.singleTypeContainer} key={index}>
                                    <h3 className={styles.optionName}>{option.name}</h3>
                                    {
                                        option.values.map((value, index) => (
                                            <label htmlFor={value} className={styles.singleOption} key={index}>
                                                <input type="radio"
                                                name={option.name}
                                                value={value}
                                                id={value}
                                                onClick={handleChangeOption}/>
                                                <p>{value}</p>
                                            </label>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        </form>
                    ): null
                }
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