import React, { useEffect, useState } from 'react'
import styles from "./AddAnimation.module.scss";
import { useMyCart } from '@/_context/MyCart';

const AddAnimation = ({children}) => {
    const [animating, setAnimating] = useState(false);
    const { lines } = useMyCart();

    useEffect(() => {
        const changeAnimation = () => {
            if(animating) {

            } else {
                setAnimating(true);
                setTimeout(() => {
                    setAnimating(false);
                }, 1000)
            }
        }
        changeAnimation();
    }, [lines])
    return (
        <div className={styles.addAnimation}>
            {
                animating ? (
                    <>
                    <div className={styles.expandingCircle}></div>
                    <div className={`${styles.shape} ${styles.shape1}`}></div>
                    <div className={`${styles.shape} ${styles.shape2}`}></div>
                    <div className={`${styles.shape} ${styles.shape3}`}></div>
                    <div className={`${styles.shape} ${styles.shape4}`}></div>
                    <div className={`${styles.shape} ${styles.shape5}`}></div>
                    </>
                ):null
            }
            {children}
        </div>
    )
}

export default AddAnimation