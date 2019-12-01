/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Col, List, Row } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReviewListCard from '../../components/review-list-card/review-list-card'


const ReviewsOfPosition = () => {
    const [reviewList, setReviewList] = useState([])
    const location = useLocation()
    let positionName = location.pathname.split("positions/")[1].trim()

    useEffect(() => {
        const fetchCompanyReviews = async () => {
            let response = await axios.get(`/review/position-name/${encodeURIComponent(positionName)}`)
            .catch(e => {
                console.error("Could not get company reviews", e)
                return false;
            })

            console.log(positionName, response)

            if (!response) {
                console.error("no company reviews")
                return []
            }
            setReviewList(response.data)
        }
        fetchCompanyReviews()
    }, [])

    return (
        <Row style={{ background: "#F5FcFF", height: "100%" }}>
            <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <h1 style={{ fontWeight: "500", marginTop: '13%' }}>{positionName} Reviews</h1>
                {reviewList ?
                    <List
                        split={false}
                        size="large"
                        dataSource={reviewList.map((review) => <ReviewListCard {...review} />)}
                        renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                    /> :
                    <h2>No Reviews</h2>
                }
            </Col>
        </Row>
    )
}

export default ReviewsOfPosition