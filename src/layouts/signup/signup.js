import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Icon, Input, InputNumber, Button, Checkbox, Tooltip } from 'antd'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

const Signup = () => {

    const [formDisable, setLoading] = useState(false)
    const [successfulSignup, setSuccessfulSignup] = useState(false)
    const initialFormInfo = {
        //mandatory
        username: '',
        password: '',
        email: '',
        institution: '',
        program: '',
        //optional
        firstName: '',
        lastName: '',
        age: 0,
        isShowInfo: false,
    }
    const [formInfo, setFormInfo] = useState({ ...initialFormInfo })

    const inputRules = {
        //mandatory
        username: {
            required: true,
            minLength: 4,
            maxLength: 16,
            helpMessage: 'Must be between 4-16 characters'
        },
        password: {
            required: true,
            minLength: 8,
            maxLength: 25,
            helpMessage: 'Must be between 8-25 characters'
        },
        email: {
            required: true,
            minLength: 4,
            maxLength: 16,
            includeArr: ['@', '.'],
            helpMessage: 'Must be in email format ____@__.___'
        },
        institution: {
            required: true,
            minLength: 4,
            maxLength: 50,
            helpMessage: 'This field is required'
        },
        program: {
            required: true,
            minLength: 4,
            maxLength: 50,
            helpMessage: 'This field is required'
        }
    }


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    const outerDiv = {
        paddingTop: '4%',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(110deg, #FCF7F8 60%, #241623 60%)'
    }

    const cardShadow = {
        boxShadow: '6px 10px 31px -17px rgba(0,0,0,0.50)',
        margin: '0.3em'
    }

    const fieldValidation = (key, value) => {
        if (!inputRules[key])
            return true

        let requiredCheck = true
        let maxLimitCheck = true
        let minLimitCheck = true
        let minCheck = true
        let maxCheck = true
        let includeCheck = true

        if (inputRules[key].required)
            requiredCheck = value !== null && (value !== '' || value !== 0)

        if (inputRules[key].maxLength)
            maxLimitCheck = value.toString().length <= inputRules[key].maxLength

        if (inputRules[key].minLength)
            maxLimitCheck = value.toString().length >= inputRules[key].minLength

        if (inputRules[key].min)
            minLimitCheck = typeof (value) === 'number' && value >= inputRules[key].min

        if (inputRules[key].max)
            minLimitCheck = typeof (value) === 'number' && value <= inputRules[key].min

        if (inputRules[key].includeArr) {
            let originalLength = inputRules[key].includeArr.length
            let newLength = inputRules[key].includeArr.filter(substr => value.toLowerCase().includes(substr)).length
            includeCheck = originalLength == newLength
        }

        let valid = maxLimitCheck && minLimitCheck && minCheck && maxCheck && requiredCheck && includeCheck

        return valid

    }

    const signupfn = async () => {
        setLoading(true)

        let isValid = true
        let invalidFields = []

        Object.keys(formInfo).forEach(k => {
            if (inputRules[k])
                isValid = fieldValidation(k, formInfo[k])

            if (!isValid)
                invalidFields.push(k)
        })

        if (invalidFields.length > 0) {
            toast.error('Some field(s) are incorrect (' + invalidFields.join(', ') + ')')
            setLoading(false)
            return
        }

        //deleting the empty unrequired fields
        let body = { ...formInfo }
        Object.keys(formInfo).forEach(k => {
            let isFieldRequired = inputRules[k] ? inputRules[k].required : false
            if (!isFieldRequired && formInfo[k] === initialFormInfo[k])
                delete body[k]
        })

        console.log('body is ', body)

        let response = await Axios
            .post('https://3u3ckfdn26.execute-api.us-east-2.amazonaws.com/dev/user', formInfo)
            .catch(e => {
                console.error(e.message)
                return null
            })

        if (!response) {
            toast.error('Could not create an account')
            setLoading(false)
            return
        }

        if (response.status != 201) {
            console.error(response.status, response.message)
            toast.error('Could not create an account')
            setLoading(false)
            return
        }

        if (response.status = 201) {
            toast('Welcome to xIntern!')
            setSuccessfulSignup(true)
            setLoading(false)
        }

    }

    const changeField = (e, key) => {
        let newState = { ...formInfo }
        newState[key] = e.target.value
        setFormInfo(newState)
    }

    return successfulSignup ?
        <Redirect to={{
            pathname: '/login',
            state: {
                username: formInfo.username
            }
        }} /> :
        (
            <div style={outerDiv}>
                <Row>
                    <Col md={{ offset: 7, span: 10 }} sm={24}>
                        <Card style={cardShadow}>
                            <h1>
                                Create an xIntern Account
                        </h1>
                            <Form {...formItemLayout} onSubmit={() => { }} className="signup-form">
                                <Form.Item label='Username'>

                                    <Tooltip trigger='focus' title={inputRules.username.helpMessage}>
                                        <Input
                                            disabled={formDisable}
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            onChange={e => changeField(e, 'username')}
                                            value={formInfo.username}
                                        />
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item label='Password'>
                                    <Tooltip trigger='focus' title={inputRules.password.helpMessage}>
                                        <Input
                                            disabled={formDisable}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            onChange={e => changeField(e, 'password')}
                                            value={formInfo.password}
                                        />
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item label='Email'>
                                    <Tooltip trigger='focus' title={inputRules.email.helpMessage}>
                                        <Input
                                            help={inputRules.email.helpMessage}
                                            disabled={formDisable}
                                            onChange={e => changeField(e, 'email')}
                                            value={formInfo.email}
                                        />
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item label='Institution'>
                                    <Tooltip trigger='focus' title={inputRules.institution.helpMessage}>
                                        <Input
                                            disabled={formDisable}
                                            prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            onChange={e => changeField(e, 'institution')}
                                            value={formInfo.institution}
                                        />
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item label='Program'>
                                    <Tooltip trigger='focus' title={inputRules.program.helpMessage}>
                                        <Input
                                            disabled={formDisable}
                                            prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            onChange={e => { changeField(e, 'program') }}
                                            value={formInfo.program}
                                        />

                                    </Tooltip>
                                </Form.Item>
                                <p>The fields below are optional</p>
                                <Form.Item label='First Name'>
                                    <Input
                                        disabled={formDisable}
                                        onChange={e => { changeField(e, 'firstName') }}
                                        value={formInfo.firstName}
                                    />
                                </Form.Item>
                                <Form.Item label='Last Name'>
                                    <Input
                                        disabled={formDisable}
                                        onChange={e => changeField(e, 'lastName')}
                                        value={formInfo.lastName}
                                    />
                                </Form.Item>
                                <Form.Item label="Age">
                                    <Input
                                        type='number'
                                        disabled={formDisable}
                                        onChange={e => changeField(e, 'age')}
                                        value={formInfo.age}
                                    />
                                </Form.Item>
                                <Form.Item label=''>
                                    <Checkbox onChange={() => setFormInfo({ ...formInfo, isShowInfo: !formInfo.isShowInfo })} checked={formInfo.isShowInfo} disabled={formDisable}>Keep my information anonymous</Checkbox>
                                </Form.Item>

                            </Form>
                            <Button
                                disabled={formDisable}
                                type="primary" onClick={signupfn} block>
                                Sign me up!
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
}

export default Signup