import { useState, useEffect } from 'react';
import { Layout, Space, Spin } from 'antd';

import useRefreshToken from 'App/hooks/useRefreshToken';

const Loader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();

    // attempt to hydrate the user
    useEffect(() => {
        const hydrateUser = async () => {
            try {
                await refresh();
            } catch (err) {
                // unset the session to prevent unwanted loops
                sessionStorage.removeItem('refresh_token');
            }

            setLoading(false);
        };

        hydrateUser();
    }, []);

    if (loading) {
        return (
            <Layout className="full-height ant-row ant-row-center ant-row-middle">
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </Layout>
        );
    }

    return children;
};

export default Loader;