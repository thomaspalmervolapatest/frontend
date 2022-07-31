import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';

import FormHandler from 'App/components/FormHandler';

function Login({ form, working, handleInput }) {
    console.log(form);

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
                                >
                                    <Form.Item
                                        label={<span className="muli semi-bold">Username</span>}
                                        name='username'
                                    >
                                        <Input
                                            value={form.username}
                                            onChange={(e) => handleInput('username', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'
                                    >
                                        <Input.Password
                                            value={form.password}
                                            onChange={(e) => handleInput('password', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="right-align-text"
                                        disabled={working}
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

export default FormHandler(Login);