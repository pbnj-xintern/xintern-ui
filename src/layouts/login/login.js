import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Icon, Input, Button } from 'antd'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { useAuthState } from '../../state/auth-state'
import { conditionalExpression } from '@babel/types'
import colors from '../../globals/colors'

const outerDiv = {
    padding: '2em',
    paddingTop: '18em',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(0deg, #FFF 60%, ' + colors.primary + ' 60%)',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const cardShadow = {
    boxShadow: '6px 10px 31px -17px rgba(0,0,0,0.50)',
    margin: '0.3em'
}

const Login = props => {

    const [authState, changeAuthState] = useAuthState();
    const [formDisable, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toHome, setToHome] = useState(false)

    useEffect(() => {
        if (props.location.state) {
            setUsername(props.location.state.username || '')
        }
    }, [])

    const changeUsername = e => {
        setUsername(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    const loginfn = async () => {
        setLoading(true)
        let response = await Axios.post('/user/login', { username: username, password: password })
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
            let token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('uid', response.data.uid)
            localStorage.setItem('username', username)
            toast.success('Successfully logged in!')

            changeAuthState({ type: 'CHANGE_AUTH_STATE', isAuth: true })
            setToHome(true)
        }

        setLoading(false)
    }

    const handleEnterKey = async (e) => {
        if (e.which === 13) {
            await loginfn()
        }
    }

    return toHome || authState.isAuth ? <Redirect to='/' /> : (
        <div style={outerDiv}>
            <Row style={{ height: "100%", width: "100%" }}>
                <Col md={{ offset: 4, span: 6 }} sm={24}>
                    <Card style={cardShadow}>
                        <h1>
                            Sign in to your xIntern account
                        </h1>
                        <Form onSubmit={() => { }} className="login-form">
                            <Form.Item>
                                <Input
                                    disabled={formDisable}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    value={username}
                                    onChange={changeUsername}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    disabled={formDisable}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={changePassword}
                                    onKeyPress={handleEnterKey}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    disabled={formDisable}
                                    type="primary" onClick={loginfn} block >
                                    Log in
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to='/signup'>
                                    <Button type="secondary" block>
                                        Sign Up
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login