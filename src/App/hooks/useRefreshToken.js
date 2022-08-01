import { DateTime } from 'luxon';

import Http from 'App/services/Http';

import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const refreshToken = sessionStorage.getItem('refresh_token');

        // abort, the user isn't authed
        if (!refreshToken) {
            return;
        }

        // make a call to the API to request a new access token
        const response = await Http.post('/oauth/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
        });

        // update our state auth data. With our expires in attribute, we'll give our self a minute buffer to reduce
        // the number of API authorisation failures.
        setAuth(_ => ({
            accessToken: response.data.access_token,
            expiresAt: DateTime.now().plus({ seconds: response.data.expires_in - 60 }),
            refreshToken: response.data.refresh_token,
        }));

        // Store the refresh token so that we can remember who the user is if they refresh, and request a new
        // access token.
        sessionStorage.setItem('refresh_token', response.data.refresh_token);

        return response.data.access_token;
    };
};

export default useRefreshToken;