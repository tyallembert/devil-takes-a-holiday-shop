'use client';
import { useContext, createContext, useState, useEffect } from 'react';

const MyCartContext = createContext(null);

export const MyCartProvider = ({ children }) => {
    const [lines, setLines] = useState([]);
    const numLines = lines.length;
    const [totalCost, setTotalCost] = useState({
        amount: 0,
        currencyCode: 'USD'
    })
    const [cartID, setCartID] = useState(null);

    useEffect(() => {
        fetchCart();
    }, [])
    /* 
        Checks Local storage to see if there is an active Cart
    */
    const addToCart = async (line) => {
        if(!cartID) {
            const id = checkLocalStorageID();
            if(!id) {
                await createCart(line);
                return;
            }else {
                setCartID(id);
            }
        }
        const data = await fetch("/api/cart/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartId: cartID, lines: [line] })
            });
        if(!data.ok) {
            console.error("Error fetching data")
            return;
        }
        const dataJSON = await data.json();
        populateLines(dataJSON.cartLinesAdd);
    }
    /* 
        Creates a Cart in Shopify and stores the ID in Local Storage
    */
    const createCart = async (line) => {
        const data = await fetch("/api/cart/create", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ line })
        });

        if(!data.ok) {
            console.error("Error fetching data")
            return;
        }
        const dataJSON = await data.json();
        localStorage.setItem('cartID', dataJSON.cartCreate.cart.id);
        setCartID(dataJSON.cartCreate.cart.id);
        populateLines(dataJSON);
    }
    /*
        Removes item from cart
    */
    const removeItem = async (lineId) => {
        console.log("LINE ID: ", lineId)
        const data = await fetch("/api/cart/removeItem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartId: cartID, lineIds: [lineId] })
        });
        if(!data.ok) {
            console.log(data.error)
            return;
        }
        const dataJSON = await data.json()
        const newLines = lines.filter((line) =>line.id !== lineId)
        setTotalCost(dataJSON.cartLinesRemove.cart.cost.totalAmount);
        setLines(newLines);
    }
    /*
    Changes the quantity of a certain item in the cart
    */
    const changeQuantity = async(lineId, upOrDown) => {
        // add in error handling for going negative
        const singleLine = lines.find((line) =>(line.id === lineId));
        if((singleLine.quantity + upOrDown) === 0) {
            removeItem(lineId);
            return;
        }
        const updatedLines = lines.map((line) => {
            if(line.id === lineId) {
                if(upOrDown === 1) {
                    line.quantity += 1;
                } else {
                    line.quantity -= 1;
                }
            }
            return line;
        })
        const data = await fetch("/api/cart/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartId: cartID, lines: updatedLines })
        })
        if(!data.ok) {
            console.error("Error fetching data")
            return;
        }
        const dataJSON = await data.json();
        setTotalCost(dataJSON.cartLinesUpdate.cart.cost.totalAmount);
        setLines(updatedLines);

    }
    /*
    Fetches the current cart based on saved cartID in localStorage
    */
    const fetchCart = async () => {
        const id = checkLocalStorageID();
        if(!id){
            return;
        }
        setCartID(id);
        const data = await fetch("/api/cart/get", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartId: id })
        });

        if(!data.ok) {
            console.error("Error fetching data")
            return;
        }
        const dataJSON = await data.json();
        populateLines(dataJSON);
    }
    /*
        Helper function to populate lines after a response
    */
    const populateLines = (data) => {
        setTotalCost(data.cart.cost.totalAmount);
        const tempLines = data.cart.lines.edges.map(line => {
            return {
                id: line.node.id,
                quantity: line.node.quantity,
                price: line.node.merchandise.price.amount,
                currencyCode: line.node.merchandise.price.currencyCode,
                merchandiseId: line.node.merchandise.id,
                title: line.node.merchandise.product.title,
                imageSRC: line.node.merchandise.image.originalSrc
            }
        });
        setLines(tempLines);
    }
    /* 
        Checks Local storage to see if there is an active Cart
    */
    const checkLocalStorageID = () => {
        const resID = localStorage.getItem('cartID');
        if(resID) {
            setCartID(resID);
            return resID;
        } else {
            return null;
        }
    }
    return (
        <MyCartContext.Provider value={{ lines, cartID, numLines, totalCost, addToCart, removeItem, fetchCart, changeQuantity }}>
        {children}
        </MyCartContext.Provider>
    );
}

export const useMyCart = () => {
  const context = useContext(MyCartContext);
  if (!context) {
    throw new Error('useMyCart must be used within a MyCartProvider');
  }
  return context;
}