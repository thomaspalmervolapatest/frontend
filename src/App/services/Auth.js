import { createContext, useContext } from 'react';

const Auth = createContext({
    isAuthenticated: false,
    user: {},
});

const useAuth = () => {
    return useContext(Auth);
}

export {
    useAuth,
};