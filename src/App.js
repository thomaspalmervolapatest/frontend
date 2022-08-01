import Router from 'App/components/Router';
import Loader from 'App/components/Loader';

import { AuthProvider } from 'App/context/AuthProvider';

import 'App.css';

const App = () => {
    return (
        <AuthProvider>
            <Loader>
                <Router />
            </Loader>
        </AuthProvider>
    );
}

export default App;
