import { createContext, useReducer } from "react";


export const CartContext = createContext({
    cart: []
})

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CART':
            return { cart: action.payload }
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: []
    })

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}