/** @jsx jsx */ import { jsx } from '@emotion/core'

import { Tabs, Row, Col, Card, List, Icon } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from '../comment-card/comment-card'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
const { TabPane } = Tabs;

const ProfileComment = props => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getCommentsByUsername = async usernameArgs => {
        try {
            let response = await axios.get(`/review/user/comment/${usernameArgs}`)
            if (response.data.error) {
                return []
            }
            return response.data
        } catch (err) {
            console.error("error getting comments")
        }
    }

    useEffect(() => {
        setIsLoading(true)
        console.log(props)
        const fetchComments = async () => {
            let comments = await getCommentsByUsername(props.username)
            comments.sort((a, b) => {
                return moment(b.createdAt).unix() - moment(a.createdAt).unix()
            })
            setIsLoading(false)
            setComments(comments);
        }
        fetchComments()
    }, [props.username])


    return (

        <div>
            <Row>
                <Col md={{ span: 17, offset: 4 }} sm={24}>
                    <h1 style={{ fontWeight: "500" }}>{`${props.username}'s Comments`}</h1>
                    <p>{comments.length} {(comments.length === 1) ? "comment" : "comments"}</p>
                    <Card>
                        {!isLoading ?
                            <List
                                split={false}
                                size="large"
                                dataSource={comments.map((comment) => <Comment {...comment} hideReplies={true} />)}
                                renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                            /> :
                            <Icon type='loading' />
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