import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    isAuth: localStorage.getItem('token') !== null
}

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

    function authReducer(state, action) {

        switch (action.type) {
            case 'CHANGE_AUTH_STATE':
                return {
                    isAuth: action.isAuth,
                };
            default:
                return {
                    isAuth: localStorage.getItem('token') !== null
                };
        }
    }

    const [authState, changeAuthState] = useReducer(authReducer, initialState);
    
    return (
        <AuthContext.Provider value={[authState, changeAuthState]}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthState = () => useContext(AuthContext)