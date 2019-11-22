/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Icon, Input, Button, Tooltip, Select } from 'antd'
import * as styles from './create-review.emotion' 
import { useLocation } from 'react-router-dom'


const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const CreateReviewForm = (props) => {
    const { getFieldDecorator } = props.form
    let location = useLocation()
    let companyName = location.pathname.split("/")[2]

    // useEffect(() => {
    //     props.form.validateFields()
    // }, [])

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        }
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }

    return (
        <Row style={{ height: "100%", width: "100%", paddingTop: "7%", paddingBottom: "3%"}} >
            <Col xl={{ span: 16, offset: 4 }} css={styles.CreateReviewCol}>
                <h1>Create a Review</h1> 
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <Form.Item label="E-mail" labelCol={{ span: 3, offset: 3 }} labelAlign="left">
                    {getFieldDecorator('email', {
                        rules: [
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ],
                    })(<Input />)}
                    </Form.Item>
                    {/* <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(<Input.Password />)}
                    </Form.Item> */}
                    {/* <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item> */}
                    <Form.Item
                    label={
                        <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    }
                    >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input />)}
                    </Form.Item>
                    {/* <Form.Item label="Habitual Residence">
                    {getFieldDecorator('residence', {
                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                        rules: [
                        { type: 'array', required: true, message: 'Please select your habitual residence!' },
                        ],
                    })(<Cascader options={residences} />)}
                    </Form.Item> */}
                    {/* <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item> */}
                    {/* <Form.Item label="Website">
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                    })(
                        <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                        placeholder="website"
                        >
                        <Input />
                        </AutoComplete>,
                    )}
                    </Form.Item> */}
                    {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(<Input />)}
                        </Col>
                        <Col span={12}>
                        <Button>Get captcha</Button>
                        </Col>
                    </Row>
                    </Form.Item> */}
                    {/* <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                        I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                    </Form.Item> */}
                    <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

const WrappedCreateReviewForm = Form.create({ name: 'create-review-form' })(CreateReviewForm);

export default WrappedCreateReviewForm
