/** @jsx jsx */ import { jsx } from '@emotion/core'

import { Tabs, Row, Col, Card, List } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from '../comment-card/comment-card'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import ReviewListCard from '../../components/review-list-card/review-list-card'
const { TabPane } = Tabs;

const ProfileReview = props => {

    const [reviewList, setReviewList] = useState([])
    const location = useLocation()
    const [username, setUsername] = useState(location.pathname.split('profile/')[1])
    
    const getReviewsByUsername = async username => {
        try {
            let response = await axios.get(`/review/user/review/${username}`)
            if (response.data.error) {
                return []
            }
            return response.data
        } catch (err) {
            console.error("error getting comments")
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            let reviewList = await getReviewsByUsername(username)
            reviewList.sort((a,b) => {
                return moment(b.createdAt).unix() - moment(a.createdAt).unix()
            })
            setReviewList(reviewList)
        }

        fetchReviews()
    }, [])


    return (

        <Row style={{height: "100%" }}>
        <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
            <h1 style={{ fontWeight: "500"}}>{`${username}'s Reviews`}</h1>
            {reviewList ?
                <List
                    split={false}
                    size="large"
                    dataSource={reviewList.map((review) => <ReviewListCard {...review} />)}
                    renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                /> :
                <h2>No Company reviews</h2>
            }
        </Col>
    </Row>
    )
}

export default ProfileReview