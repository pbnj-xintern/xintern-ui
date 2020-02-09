/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Col, List, Row } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReviewListCard from '../../components/review-list-card/review-list-card'
import colors from '../../globals/colors'


const ReviewsOfPosition = () => {
    const [reviewList, setReviewList] = useState([])
    const location = useLocation()
    let positionName = location.pathname.split("positions/")[1].trim()

    useEffect(() => {
        window.scrollTo({ top: 0 })
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
        <Row style={{ background: colors.lightBackground1, minHeight: "100vh", paddingTop:'7em', paddingBottom: "4%" }}>
            <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <h1 style={{ fontWeight: "500", paddingBottom: "1%" }}>{positionName} Reviews</h1>
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