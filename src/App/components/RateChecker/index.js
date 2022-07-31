import { Row, Col, Typography, Card, Form, Input, Select, Space, Progress, Button } from 'antd'

function RateChecker() {
    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover-no-border'>
                            <Form layout='vertical'>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            name='convertTo'
                                            label={<span className='muli semi-bold fs-18px'>Convert To</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Select
                                                        className='dark-green'
                                                        showSearch
                                                        filterOption={(input, option) => {
                                                            if (option.children)
                                                                return option.children.toLowerCase().includes(input.toLowerCase())
                                                            else if (option.label)
                                                                return option.label.toLowerCase().includes(input.toLowerCase())
                                                        }}>
                                                        <Select.OptGroup label='Common'>
                                                            <Select.Option value="GBP">GBP</Select.Option>
                                                            <Select.Option value="EUR">EUR</Select.Option>
                                                        </Select.OptGroup>
                                                        <Select.OptGroup label='Other'>
                                                            <Select.Option value="USD">USD</Select.Option>
                                                            <Select.Option value="AUD">AUD</Select.Option>
                                                        </Select.OptGroup>
                                                    </Select>
                                                </Col>
                                                <Col span={18}>
                                                    <Input placeholder='Enter Amount' />
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item
                                            name='convertFrom'
                                            label={<span className='muli semi-bold fs-18px'>Convert From</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Select
                                                        className='dark-green'
                                                        showSearch
                                                        filterOption={(input, option) => {
                                                            if (option.children)
                                                                return option.children.toLowerCase().includes(input.toLowerCase())
                                                            else if (option.label)
                                                                return option.label.toLowerCase().includes(input.toLowerCase())
                                                        }}>
                                                        <Select.OptGroup label='Common'>
                                                            <Select.Option value="GBP">GBP</Select.Option>
                                                            <Select.Option value="EUR">EUR</Select.Option>
                                                        </Select.OptGroup>
                                                        <Select.OptGroup label='Other'>
                                                            <Select.Option value="USD">USD</Select.Option>
                                                            <Select.Option value="AUD">AUD</Select.Option>
                                                        </Select.OptGroup>
                                                    </Select>
                                                </Col>
                                                <Col span={18}>
                                                    <Input placeholder='Enter Amount' />
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row align='bottom'>
                                    <Col span={12}>
                                        <Space>
                                            <Progress type='circle' percent={75} width={40} format={() => `30s`} />
                                            <Space direction='vertical' size={0}>
                                                <Typography.Text className='muli semi-bold light-green'>FX Rate</Typography.Text>
                                                <Typography.Text className='muli semi-bold light-green'>1 GBP = 1.19 EUR</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12} className='right-align-text'>
                                        <Button type='primary' htmlType='submit'>Convert</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default RateChecker;