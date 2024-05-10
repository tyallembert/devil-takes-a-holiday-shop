"use client";
import Link from 'next/link';
import React from 'react';
import styles from "./page.module.scss";
import { MyCartProvider } from '@/_context/MyCart';

const AllProducts = ({products}) => {
    return (
        <MyCartProvider>
            <ProductsComponent products={products}/>
        </MyCartProvider>
    )
}

export default AllProducts

const ProductsComponent = ({products}) => {
    return (
        <main className={styles.main}>
        <h1>DTAH Store</h1>
        <div className={styles.allProducts}>
        {
            products ? (
            products.map(( product ) => (
                <Link key={product.id} href={`/products/${product.handle}`} className={styles.productContainer}>
                <img src={product.imageSRC} alt={product.altText} />
                <div className={styles.textContainer}>
                    <h2>{product.title}</h2>
                    <p>${product.price}</p>
                </div>
                </Link>
            ))
            ):null
        }
        </div>
        </main>
    )
}