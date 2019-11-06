import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { toast } from 'react-toastify'
import Axios from 'axios'

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
        let response = await Axios.post('/login').catch(e => {
            console.error('Could not log in', e.nessage)
            return null
        })

        if (!response) {
            toast.error('Could not login')
        }

        if (response.status === 200) {
            let token = response.data.token
            let uid = response.data.uid
            toast.success('Successfully logged in!')
        }

    }

    const [username, setUsername] = useState({})
    const [password, setPassword] = useState({})

    return (
        <div style={outerDiv}>
            <Row>
                <Col md={{ offset: 4, span: 5 }} sm={24}>
                    <Card style={cardShadow}>
                        <h1>
                            Sign in to your xIntern account
                        </h1>
                        <Form onSubmit={() => { }} className="login-form">
                            <Form.Item>
                                <Input
                                    shape="round"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    onChange={changeUsername}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={changePassword}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={login} block>
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