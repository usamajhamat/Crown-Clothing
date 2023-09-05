import { createContext,useState, useEffect } from "react";
//import CartItem from "../cart-item/cart-item.component";

const addCartItem=(cartItems, productToAdd)=>{
    const existingCartItem= cartItems.find(
        (CartItem)=> CartItem.id === productToAdd.id
    );

    if(existingCartItem){
        return cartItems.map((cartItem)=>
        cartItem.id === productToAdd.id 
         ? {...cartItem, quantity: cartItem.quantity + 1 }
         : cartItem
        );
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}]

};

const removeCartItems=(cartItems, cartItemToRemove)=>{
    // find the cart item to remove
    const existingCartItem= cartItems.find(
        (CartItem)=> CartItem.id === cartItemToRemove.id
    );
    // check if the quantity equals to 1, if it is, remove item from cart

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id);
    }
    // return back cart itemwith matching cart item with reduced quantity
    return cartItems.map((cartItem)=>
    cartItem.id === cartItemToRemove.id 
     ? {...cartItem, quantity: cartItem.quantity - 1 }
     : cartItem
    );
};

const clearCartItem=(cartItems, cartItemToClear)=> cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id);


export const CartContext=createContext({
    isCartOpen: false, 
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount: 0,
    cartTotal: 0,

})

export const CartProvider=({children})=>{
    const [isCartOpen, setIsCartOpen]=useState(false);
    const[cartItems, setCartItems]=useState([]);
    const[cartCount, setCartCount]=useState(0);
    const[cartTotal, setCartTotal]=useState(0);

    useEffect(()=>{
        const newCartCount= cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(()=>{
        const newCartTotal= cartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);

    }, [cartItems]);

    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));

    };

    const removeItemToCart=(cartItemToRemove)=>{
        setCartItems(removeCartItems(cartItems, cartItemToRemove));

    };

    const clearItemFromCart=(cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems, cartItemToClear));

    };

    const value= {
        isCartOpen,
         setIsCartOpen,
          addItemToCart,
          removeItemToCart,
          clearItemFromCart,
          cartItems,
           cartCount,
           cartTotal,
         };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};