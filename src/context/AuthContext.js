import { createContext, useReducer } from "react";


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { user: null, isLoading: true }
        case 'LOGIN_SUCCESS':
            return { user: action.payload, isLoading: false }
        case 'LOGOUT':
            return { user: null, isLoading: false }
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, disptach] = useReducer(authReducer, {
        user: null,
        isLoading: false
    })

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}