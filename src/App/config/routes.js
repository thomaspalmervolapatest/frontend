import WalletDashboard from 'App/pages/WalletDashboard';
import Login from 'App/pages/Login';

const routes = [
    { path: '/', redirect: '/wallet-dashboard', guards: ['guest'] },
    { path: '/wallet-dashboard', element: WalletDashboard, guards: ['auth'] },
    { path: '/login', element: Login, guards: ['guest'] },
];

export default routes;