import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

function Login() {
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
                                    requiredMark={false}>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Username</span>}
                                        name='username'
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'>
                                        <Input.Password />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" className="right-align-text">Login</Button>
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