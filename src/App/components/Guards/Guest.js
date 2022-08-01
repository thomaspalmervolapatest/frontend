import { Navigate } from 'react-router-dom';

import useAuth from 'App/hooks/useAuth';

const Guest = ({ children }) => {
    const { auth } = useAuth();

    if (auth.accessToken) {
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