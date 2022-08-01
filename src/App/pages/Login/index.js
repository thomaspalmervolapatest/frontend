import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row, Typography, Alert } from 'antd';
import { DateTime } from 'luxon';

import useAuth from 'App/hooks/useAuth';

import Http from 'App/services/Http';

function Login() {
    const { setAuth } = useAuth();

    // get the path that the user came from so that we can redirect them back
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const [working, setWorking] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (form) => {
        // disable the login button to prevent multiple presses
        setWorking(true);

        // reset the alert so that it doesn't look like a failure again until it actually is one
        setError(null);

        // attempt to auth with the API for an access token
        try {
            const response = await Http.post('oauth/token', {
                ...form,
                grant_type: 'password',
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
            });

            // we now have the bearer data from the api for storing, and we'll send the user to  their intended
            // destination. With our expires in attribute, we'll give our self a minute buffer to reduce the number of
            // API authorisation failures.
            setAuth({
                accessToken: response.data.access_token,
                expiresAt: DateTime.now().plus({ seconds: response.data.expires_in - 60 }),
                refreshToken: response.data.refresh_token,
            });

            // Store the refresh token so that we can remember who the user is if they refresh, and request a new
            // access token.
            sessionStorage.setItem('refresh_token', response.data.refresh_token);

            navigate(from);
        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 400) {
                setError('Missing or incorrect username or password');
            } else {
                setError('Login Failed');
            }
        }

        // allow the form to be active again
        setWorking(false);
    };

    return (
        <Row className="full-height" align="middle" justify="center">
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                <Typography.Text className="medium fs-28px dark-green">Login</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                                <Form
                                    layout="vertical"
                                    requiredMark={false}
                                    onFinish={handleSubmit}
                                >
                                    {error && (<Alert type="error" message={error} className="m-b-10" />)}

                                    <Form.Item
                                        label={<span className="muli semi-bold">Username</span>}
                                        name='username'
                                        rules={[{ required: true, message: 'Please enter a username'}]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'
                                        rules={[{ required: true, message: 'Please enter a password'}]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="right-align-text"
                                        loading={working}
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;