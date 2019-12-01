/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Col, Icon, List, Row, Tabs } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import ReviewListCard from '../../components/review-list-card/review-list-card'

const { TabPane } = Tabs;

const ProfileReview = props => {
    const [reviewList, setReviewList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getReviewsByUsername = async usernameArg => {
        try {
            let response = await axios.get(`/review/user/review/${usernameArg}`)
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
        const fetchReviews = async () => {
            let userReviews = await getReviewsByUsername(props.username)
            userReviews.sort((a, b) => {
                return moment(b.createdAt).unix() - moment(a.createdAt).unix()
            })
            setIsLoading(false)
            setReviewList(userReviews)
        }
        fetchReviews()
    }, [props.username])


    return (
        <Row style={{ height: "100%" }}>
            <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <p>{JSON.stringify(reviewList)}</p>
                <h1 style={{ fontWeight: "500" }}>{`${props.username}'s Reviews`}</h1>
                {!isLoading ?
                    <List
                        split={false}
                        size="large"
                        dataSource={reviewList.map((review) => <ReviewListCard {...review} />)}
                        renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                    /> :
                    <Icon type='loading' />
                }
            </Col>
        </Row>
    )
}

export default ProfileReview
