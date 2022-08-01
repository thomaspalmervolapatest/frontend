import { useContext } from 'react';
import AuthContext from 'App/context/AuthProvider';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;