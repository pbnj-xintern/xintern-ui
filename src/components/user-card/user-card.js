
/** @jsx jsx */ import { jsx } from '@emotion/core';
import { Card, Col, Icon, Row, Tabs } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment'
const { TabPane } = Tabs;


const getUserInfoByUsername = async usernameArgs => {
    try {
        let response = await axios.get(`/user/${usernameArgs}`)
        if (response.data.error) {
            return []
        }
        return response.data
    } catch (err) {
        console.error("error getting comments")
    }
}

const UserCard = props => {

    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        const fetchAndSetUserInfo = async usernameArg => {
            setUserInfo(await getUserInfoByUsername(usernameArg))
        }
        fetchAndSetUserInfo(props.username)
        setIsLoading(false)
    }, [props.username])


    return (
        <div>
            <Row>
                <Col md={{ span: 12, offset: 6 }} sm={24}>
                    <h1 style={{ fontWeight: "500" }}>{props.username}'s Info</h1>
                    <Card>
                        {isLoading &&
                            <Icon type='loading'></Icon>
                        }
                        {userInfo.isShowInfo ?
                            <div>
                                <p><b>School</b>: {userInfo.institution || 'N/A'}</p>
                                <p><b>Joined at</b>: {moment(userInfo.createdAt).format('MMM DD YYYY') || 'N/A'}</p>
                                <p><b>Program</b>: {userInfo.program || 'N/A'}</p>
                                <p><b>Email</b>: {userInfo.email || 'N/A'}</p>
                            </div> :
                            <h2>User has decided to keep their information anonymous<br/><Icon type="stop" /></h2>
                        }
                    </Card>
                </Col>
            </Row>

        </div>
    )
}


export default UserCard