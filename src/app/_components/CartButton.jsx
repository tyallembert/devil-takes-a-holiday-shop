'use client';
import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartButton.module.scss";
import { useRouter } from 'next/navigation';
import { useMyCart } from '@/_context/MyCart';

const CartButton = () => {
    const [clicked, setClicked] = useState(false);
    const { numLines } = useMyCart();
    const router = useRouter();

    const handleClick = () => {
        setClicked(!clicked);
        setTimeout(() => {
            router.push("/cart", { scroll: false });
        }, 1000);
    }
    return (
        <button className={`${styles.cartButton} ${numLines === 0 ? styles.hidden: null} ${clicked ? styles.animateAway: null}`} onClick={handleClick}>
            <p className={styles.numLines}>{numLines}</p>
            <FaShoppingCart />
        </button>
    )
}

export default CartButton