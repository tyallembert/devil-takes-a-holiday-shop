"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "./AllProducts.module.scss";
import { MyCartProvider, useMyCart } from '@/_context/MyCart';
import { FaCartPlus, FaCheck } from "react-icons/fa";
import Cart from './_components/Cart';
import Image from 'next/image';

const AllProducts = ({products}) => {
    return (
        <MyCartProvider>
            <ProductsComponent products={products}/>
        </MyCartProvider>
    )
}

export default AllProducts

const ProductsComponent = ({products}) => {
    const {addToCart, lines} = useMyCart();

    const handleQuickAdd = (event, id) => {
        event.preventDefault();
        addToCart({
            quantity: 1,
            merchandiseId: id, 
        });
    }
    return (
        <main className={styles.main}>
            <Cart />
            <h1>DTAH Store</h1>
            <div className={styles.allProducts}>
            {
                products ? (
                    products.map((product, index) => (
                        <Link key={index} 
                        href={`/products/${product.handle}`} 
                        className={styles.productContainer}
                        style={{
                            "animationDelay": `${100 * index}ms`
                        }}>
                            <div className={styles.imageContainer}>
                                <Image src={product.imageSRC} alt={product.altText} width={500} height={500}/>
                            </div>
                            <div className={styles.textContainer}>
                                <h2>{product.title}</h2>
                                <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
                                {
                                    lines.find((line)=>(line.merchandiseId === product.variantId)) ? (
                                        <button className={`${styles.addCartButton} ${styles.inCart}`}>
                                            <FaCheck />
                                        </button>
                                    ): (
                                    <button className={styles.addCartButton} onClick={(event)=>handleQuickAdd(event, product.variantId)}>
                                        <FaCartPlus />
                                    </button>
                                    )
                                }
                            </div>
                        </Link>
                    ))
                ): (
                    [0,0,0].map((index) => (
                        <div key={index} className={styles.previewContainer}></div>
                    ))
                )
            }
            </div>
        </main>
    )
}