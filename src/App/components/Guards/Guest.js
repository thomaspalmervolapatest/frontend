import { Navigate } from 'react-router-dom';

import { useAuth } from 'App/services/Auth';

const Guest = ({ children }) => {
    const auth = useAuth();

    if (auth.isAuthenticated) {
        return (
            <Navigate 
                to="/"
                replace
            />
        );
    }

    return children;
};

export default Guest;