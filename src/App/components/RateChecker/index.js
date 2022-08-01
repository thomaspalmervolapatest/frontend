import { useEffect, useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Typography, Card, Form, InputNumber, Select, Space, Progress, Button, Alert } from 'antd';

import useAxiosApi from 'App/hooks/useAxiosApi';

const RateChecker = () => {
    const axiosApi = useAxiosApi();
    const navigate = useNavigate();
    const location = useLocation();

    const [form] = Form.useForm();
    const [working, setWorking] = useState(false);
    const [currencyRates, setCurrencyRates] = useState([]);
    const [convertToAlert, setConvertToAlert] = useState(null);
    const [convertFromAlert, setConvertFromAlert] = useState(null);

    // Load in the currency rates from the API
    useEffect(() => {
        const getCurrencyRates = async () => {
            setWorking(true);

            try {
                const response = await axiosApi.get('currency-rates');

                setCurrencyRates(response.data.data);
            } catch (err) {
                // Catch errors and ask the user to re-authenticate
                navigate('/login', {
                    state: {
                        from: location,
                    },
                    replace: true,
                });
            }

            setWorking(false);
        };

        getCurrencyRates();
    }, []);

    const handleSubmit = (form) => {
        if (form.convertToCurrency && form.convertToAmount) {
            // find the current record by ID so that we can get the currency name and rate
            const currencyRate = currencyRates.find(rate => rate.id === form.convertToCurrency);

            const { convertToAmount } = form;
            const { currency, rate } = currencyRate;
            const receiveAmount = (rate * convertToAmount).toFixed(2);

            setConvertToAlert(`
                If you convert ${convertToAmount} into ${currency} with a conversion rate of 1GBP  
                = ${rate}${currency} you will receive ${receiveAmount}${currency}
            `);
        }

        if (form.convertFromCurrency && form.convertFromAmount) {
            // find the current record by ID so that we can get the currency name and rate
            const currencyRate = currencyRates.find(rate => rate.id === form.convertFromCurrency);

            const { convertFromAmount } = form;
            const { currency, rate } = currencyRate;
            const receiveAmount = (convertFromAmount / rate).toFixed(2);

            setConvertFromAlert(`
                If you convert ${convertFromAmount} from ${currency} with a conversion rate of  
                ${rate}${currency} = 1GBP you will receive ${receiveAmount} GBP
            `);
        }
    };

    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover-no-border'>
                            {convertToAlert && (<Alert type="success" message={convertToAlert} />)}
                            {convertFromAlert && (<Alert type="success" message={convertFromAlert} />)}

                            <Form form={form} layout='vertical' onFinish={handleSubmit}>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<span className='muli semi-bold fs-18px'>Convert To</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="convertToCurrency"
                                                    >
                                                        <Select
                                                            className='dark-green'
                                                            showSearch
                                                            filterOption={(input, option) => {
                                                                if (option.children)
                                                                    return option.children.toLowerCase().includes(input.toLowerCase())
                                                                else if (option.label)
                                                                    return option.label.toLowerCase().includes(input.toLowerCase())
                                                            }}
                                                            disabled={working}
                                                        >
                                                            {currencyRates.length > 0 && (
                                                                <Fragment>
                                                                    <Select.OptGroup label='Common'>
                                                                        {currencyRates.filter(rate => rate.common).map(rate => (
                                                                            <Select.Option key={rate.id} value={rate.id}>{rate.currency}</Select.Option>
                                                                        ))}
                                                                    </Select.OptGroup>
                                                                    <Select.OptGroup label='Other'>
                                                                        {currencyRates.filter(rate => !rate.common).map(rate => (
                                                                            <Select.Option key={rate.id} value={rate.id}>{rate.currency}</Select.Option>
                                                                        ))}
                                                                    </Select.OptGroup>
                                                                </Fragment>
                                                            )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={18}>
                                                    <Form.Item
                                                        name="convertToAmount"
                                                        rules={[{ type: 'number', message: 'Please enter a valid number' }]}
                                                    >
                                                        <InputNumber placeholder='Enter Amount' min={0.01} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item
                                            name='convertFrom'
                                            label={<span className='muli semi-bold fs-18px'>Convert From</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="convertFromCurrency"
                                                    >
                                                        <Select
                                                            className='dark-green'
                                                            showSearch
                                                            filterOption={(input, option) => {
                                                                if (option.children)
                                                                    return option.children.toLowerCase().includes(input.toLowerCase())
                                                                else if (option.label)
                                                                    return option.label.toLowerCase().includes(input.toLowerCase())
                                                            }}
                                                            disabled={working}
                                                        >
                                                            {currencyRates.length > 0 && (
                                                                <Fragment>
                                                                    <Select.OptGroup label='Common'>
                                                                        {currencyRates.filter(rate => rate.common).map(rate => (
                                                                            <Select.Option key={rate.id} value={rate.id}>{rate.currency}</Select.Option>
                                                                        ))}
                                                                    </Select.OptGroup>
                                                                    <Select.OptGroup label='Other'>
                                                                        {currencyRates.filter(rate => !rate.common).map(rate => (
                                                                            <Select.Option key={rate.id} value={rate.id}>{rate.currency}</Select.Option>
                                                                        ))}
                                                                    </Select.OptGroup>
                                                                </Fragment>
                                                            )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={18}>
                                                    <Form.Item
                                                        name="convertFromAmount"
                                                        rules={[{ type: 'number', message: 'Please enter a valid number' }]}
                                                    >
                                                        <InputNumber placeholder='Enter Amount' />
                                                    </Form.Item>
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
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            loading={working}
                                        >
                                            Convert
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}

export default RateChecker;