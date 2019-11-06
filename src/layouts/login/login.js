import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

const outerDiv = {
    paddingTop: '20em',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(4deg, #FFF 60%, rgb(21, 97, 173) 60%)'
}

const cardShadow = {
    boxShadow: '6px 10px 31px -17px rgba(0,0,0,0.50)',
    margin: '0.3em'
}

const Login = () => {

    const changeUsername = e => {
        setUsername(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    const login = async () => {
        setLoading(true)
        let response = await Axios.post('https://3u3ckfdn26.execute-api.us-east-2.amazonaws.com/dev/user/login', { username: username, password: password })
            .catch(e => {
                console.error('Could not log in', e.nessage)
                return null
            })

        if (!response) {
            toast.error('Could not login')
            setLoading(false)
            return
        }

        if (response.status === 200) {
            console.log('response.data', response.data)
            let token = response.data.token
            localStorage.setItem('token', token)
            toast.success('Successfully logged in!')
            setToHome(true)
        }

        setLoading(false)
    }

    const [formDisable, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toHome, setToHome] = useState(false)

    return toHome ? <Redirect to='/' /> : (
        <div style={outerDiv}>
            <Row>
                <Col md={{ offset: 4, span: 6 }} sm={24}>
                    <Card style={cardShadow}>
                        <h1>
                            Sign in to your xIntern account
                        </h1>
                        <Form onSubmit={() => { }} className="login-form">
                            <Form.Item>
                                <Input
                                    disabled={formDisable}
                                    shape="round"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    onChange={changeUsername}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    disabled={formDisable}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={changePassword}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    disabled={formDisable}
                                    type="primary" onClick={login} block>
                                    Log in
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="secondary" block>
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login