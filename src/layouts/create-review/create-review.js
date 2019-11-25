/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Icon, Input, Button, Tooltip, Select, Rate } from 'antd'
import * as styles from './create-review.emotion' 
import axios from 'axios'
import { useLocation } from 'react-router-dom'


const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const CreateReviewForm = (props) => {
    const { getFieldDecorator } = props.form
    let location = useLocation()
    let companyName = location.pathname.split("/")[2]
    const { Option } = Select
    const { TextArea } = Input

    const [payload, setPayload] = useState({
        culture: 0,
        mentorship: 0,
        impact: 0,
        interview: 0,
        company_name: "",
        salary: 0,
        content: "",
        position: "",
        currency: "",
        payPeriod: ""
    })

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
            sm: { span: 16, offset: 8 },
            xl: { span: 4, offset: 10 }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
        setPayload({
            culture: 0,
            mentorship: 0,
            impact: 0,
            interview: 0,
            company_name: "",
            location: "",
            salary: 0,
            content: "",
            position: "",
            currency: "",
            payPeriod: ""
        })
        let response = await axios.post("/review", payload)
        console.log('post response:\n', response)
    }

    return (
        <Row style={{ height: "100%", width: "100%", paddingTop: "7%", paddingBottom: "3%"}} >
            <Col xl={{ span: 16, offset: 4 }} css={styles.CreateReviewCol}>
                <h1 style ={{ paddingTop: "2%", paddingBottom: "2%" }}>Create a Review</h1> 
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <Row style={{ paddingBottom: "0.5%" }}>
                        <Col xl={{ span: 11, offset: 1 }}>
                            <Form.Item label="Company" labelCol={{ span: 6, offset: 1 }} labelAlign="left">
                                {getFieldDecorator('company', {
                                    rules: [
                                    {
                                        type: 'string',
                                        message: 'No such Company found.',
                                    },
                                    {
                                        required: true,
                                        message: 'Please select a Company.',
                                    },
                                    ],
                                })(<Select defaultValue={"hello"}/>)}
                            </Form.Item>
                        </Col>
                        <Col xl={{ span: 8, offset: 0 }}>
                            <Form.Item label="Location" labelCol={{ span: 7, offset: 1 }} labelAlign="left">
                                {getFieldDecorator('company-location', {
                                    rules: [
                                    {
                                        type: 'string',
                                        message: 'No such Location found.',
                                    },
                                    {
                                        required: true,
                                        message: 'Please select a Location.',
                                    },
                                    ],
                                })(<Select />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={{ span: 24, offset: 0 }} style={{ paddingLeft: "6%" }}>
                            <Form.Item label="Culture" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                {getFieldDecorator('culture-rating', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a Rating.',
                                        }
                                    ],
                                    initialValue: 3.5
                                })(<Col xl={{ span: 7 }}><Rate allowHalf /></Col>)}
                            </Form.Item>
                            <Form.Item label="Mentorship" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                {getFieldDecorator('mentorship-rating', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a Rating.',
                                        }
                                    ],
                                    initialValue: 3.5
                                })(<Col xl={{ span: 7 }}><Rate allowHalf /></Col>)}
                            </Form.Item>
                            <Form.Item label="Impact" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                {getFieldDecorator('impact-rating', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a Rating.',
                                        }
                                    ],
                                    initialValue: 3.5
                                })(<Col xl={{ span: 7 }}><Rate allowHalf /></Col>)}
                            </Form.Item>
                            <Form.Item label="Interview" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                {getFieldDecorator('interview-rating', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a Rating.',
                                        }
                                    ],
                                    initialValue: 3.5
                                })(<Col xl={{ span: 7 }}><Rate allowHalf /></Col>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: "1%" }}>
                        <Col xl={{ span: 24, offset: 0 }}>
                            <Form.Item label="Position" labelCol={{ span: 3, offset: 1 }} labelAlign="left" style={{ paddingLeft: "2%" }}>
                                {getFieldDecorator('position', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter a job position.',
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: "1%" }}>
                        <Col xl={{ span: 12, offset: 0 }} style={{ paddingLeft: "2.5%" }}>
                            <Form.Item label="Salary" labelCol={{ span: 6, offset: 0 }} labelAlign="left" style={{ paddingLeft: "10%" }}>
                                {getFieldDecorator('salary', {
                                    rules: [
                                        {
                                            type: 'number',
                                            message: 'Please enter a number.',
                                        }                                 
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col xl={{ span: 6, offset: 0 }}>
                            <Form.Item label="Currency" labelCol={{ span: 8, offset: 0 }} labelAlign="left">
                                {getFieldDecorator('currency', {
                                    rules: [
                                    {
                                        type: 'string',
                                        message: 'No such Location found.',
                                    },                                    
                                    ],
                                })(<Select />)}
                            </Form.Item>
                        </Col>
                        {/* <Col xl={{ span: 8, offset: 1 }}>
                            <Form.Item label="Pay Period" labelCol={{ span: 7, offset: 0 }} labelAlign="left">
                                {getFieldDecorator('pay-period', {
                                    rules: [
                                    {
                                        type: 'string',
                                        message: 'No such Location found.',
                                    },                                
                                    ],
                                })(<Select />)}
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Col xl={{ span: 10, offset: 1 }} style={{ paddingLeft: "3%", paddingBottom: "1%" }}>
                        <Form.Item label="Pay Period" labelCol={{ span: 7, offset: 0 }} labelAlign="left">
                            {getFieldDecorator('pay-period', {
                                rules: [
                                {
                                    type: 'string',
                                    message: 'No such Location found.',
                                },                                
                                ],
                            })(<Select />)}
                        </Form.Item>
                    </Col>
                    <Row>
                        <Col xl={{ span: 23, offset: 1 }}>
                            <Form.Item label="Content" labelCol={{ span: 3, offset: 0 }} labelAlign="left" style={{ paddingLeft: "2%" }}>
                                {getFieldDecorator('content', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please include a review."
                                        }                             
                                    ],
                                })(<TextArea placeholder="Write something nice! (Or not)" autoSize={{ minRows: 8, maxRows: 24 }} />)}
                            </Form.Item>
                        </Col>
                    </Row>            
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Create Review
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

const WrappedCreateReviewForm = Form.create({ name: 'create-review-form' })(CreateReviewForm);

export default WrappedCreateReviewForm
