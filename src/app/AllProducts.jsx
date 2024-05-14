"use client";
import Link from 'next/link';
import React from 'react';
import styles from "./AllProducts.module.scss";
import { MyCartProvider } from '@/_context/MyCart';
import CartButton from './_components/CartButton';
import { FaCartPlus } from "react-icons/fa";

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
            <CartButton />
            <h1>DTAH Store</h1>
            <div className={styles.allProducts}>
            {
                products ? (
                products.map(( product, index ) => (
                    <Link key={index} href={`/products/${product.handle}`} className={styles.productContainer}>
                    <img src={product.imageSRC} alt={product.altText} />
                    <div className={styles.textContainer}>
                        <h2>{product.title}</h2>
                        <p className={styles.price}>${product.price}</p>
                        <button className={styles.addCartButton}>
                            <FaCartPlus />
                        </button>
                    </div>
                    </Link>
                ))
                ):null
            }
            </div>
        </main>
    )
}