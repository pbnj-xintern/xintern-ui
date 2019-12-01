/** @jsx jsx */ import { jsx } from '@emotion/core'

import { Tabs, Row, Col, Card, List} from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from '../comment-card/comment-card'
import moment from 'moment'
import {useLocation } from 'react-router-dom'
const { TabPane } = Tabs;

const ProfileComment = props => {
    const location = useLocation()
    const [username, setUsername] = useState(location.pathname.split('profile/')[1])
    const [comments, setComments] = useState([])
    const getCommentsByUsername = async username => {
        try {
            let response = await axios.get(`/review/user/comment/${username}`)
            if (response.data.error) {
                return []
            }
            return response.data
        } catch (err) {
            console.error("error getting comments")
        }
    }

    useEffect(() => {
        console.log(username)
        const fetchComments = async () => {
            let comments = await getCommentsByUsername(username)
            comments.sort((a,b) => {
                
                return moment(b.createdAt).unix() - moment(a.createdAt).unix()
            })
            console.log(comments)
            setComments(comments);
            console.log("setting comments")
        }

        fetchComments()
    }, [])


    return (

        <div>
            <Row>
                <Col md={{ span: 17, offset: 4 }} sm={24}>
                    <h1 style={{ fontWeight: "500"}}>{`${username}'s Comments`}</h1>
                    <Card>
                        {comments ?
                            <List
                                split={false}
                                size="large"
                                dataSource={comments.map((comment) => <Comment {...comment} hideReplies={true} />)}
                                renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                            /> :
                            <h2>No Comments</h2>
                        }
                    </Card>
                    {/* <Card>
                        
                        {comments !== [] && comments.map(comment => <Comment {...comment} hideReplies={true} />)}
                    
                    </Card> */}
                </Col>
            </Row>

        </div>
    )
}

export default ProfileComment