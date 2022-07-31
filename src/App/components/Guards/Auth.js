import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'App/services/Auth';

const Auth = ({ children }) => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return (
            <Navigate 
                to="/login"
                state={{
                    from: location,
                }}
                replace
            />
        );
    }

    return children;
};

export default Auth;