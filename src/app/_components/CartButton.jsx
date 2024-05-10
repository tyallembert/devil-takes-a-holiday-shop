'use client';
import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartButton.module.scss";
import { useRouter } from 'next/navigation';

const CartButton = () => {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const handleClick = () => {
        console.log("Cart button clicked");
        setClicked(!clicked);
        setTimeout(() => {
            router.push("/cart", { scroll: false });
        }, 1000);
    }
    return (
        <button className={`${styles.cartButton} ${clicked ? styles.animateAway: null}`} onClick={handleClick}>
            <FaShoppingCart />
        </button>
    )
}

export default CartButton