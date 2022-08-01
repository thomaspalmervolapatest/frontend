import Auth from 'App/components/Guards/Auth';
import Guest from 'App/components/Guards/Guest';

const guards = {
    'auth': Auth,
    'guest': Guest,
};

export default guards;