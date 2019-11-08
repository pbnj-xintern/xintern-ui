/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ReviewListCard from '../../components/review-list-card/review-list-card'

import { Row, Col, List } from 'antd'

const getReviewsByCompany = async (companyId) => {
    try {
        let response = await axios.get(`https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/company/${companyId}/reviews`)
        if (response.data.length == 0 || response.data.error) {
            console.error("no company reviews")
            return []
        }
        return response.data
    } catch (err) {
        console.error("Could not get company reviews", err.message)
    }
}

const CompanyReviews = () => {
    const [reviewList, setReviewList] = useState([])
    const location = useLocation()
    let companyId = location.pathname.split("/")[2]

    useEffect(() => {
        const fetchCompanyReviews = async () => {
            setReviewList(await getReviewsByCompany(companyId))
        }
        fetchCompanyReviews()
    }, [])

    return (
        <Row style={{ background: "#F5FcFF", height: "100%" }}>
            <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <h1 style={{ fontWeight: "500", marginTop: '13%' }}>{reviewList[0] ? reviewList[0].company.name : "Company"} Reviews</h1>
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

export default CompanyReviews