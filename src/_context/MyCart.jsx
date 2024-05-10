'use client';
import { useContext, createContext, useState } from 'react';

const MyCartContext = createContext(null);

export const MyCartProvider = ({ children }) => {
    const [lines, setLines] = useState([]);
    const [cartID, setCartID] = useState(null);

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
        if(lines.length > 0) {
            const data = await fetch("/api/cart/add", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ line, cartID })
              });
            if(!data.ok) {
                console.error("Error fetching data")
                return;
            }
            const dataJSON = await data.json();
            const tempLines = dataJSON.cartAdd.cart.lines.edges.map(line => {
                return {
                    id: line.node.id,
                    quantity: line.node.quantity,
                    merchandiseId: line.node.merchandise.id
                }
            });
            setLines(tempLines);
        } else {
            await createCart(line);
            //handle errors
        }
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
        const tempLines = dataJSON.cartCreate.cart.lines.edges.map(line => {
            return {
                id: line.node.id,
                quantity: line.node.quantity,
                merchandiseId: line.node.merchandise.id
            }
        });
        setLines(tempLines);
    }
    const fetchCart = async () => {
        const data = await fetch("/api/cart/get", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartID })
        });

        if(!data.ok) {
            console.error("Error fetching data")
            return;
        }
        const dataJSON = await data.json();
        const tempLines = dataJSON.cart.cart.lines.edges.map(line => {
            return {
                id: line.node.id,
                quantity: line.node.quantity,
                merchandiseId: line.node.merchandise.id
            }
        });
        setLines(tempLines);
    }
    /* 
        Checks Local storage to see if there is an active Cart
    */
    const checkLocalStorageID = () => {
        const cartID = localStorage.getItem('cartID');
        if(cartID) {
            setCartID(cartID);
            fetchCart();
            return cartID;
        } else {
            return null;
        }
    }
    return (
        <MyCartContext.Provider value={{ lines, cartID, addToCart, checkLocalStorageID }}>
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