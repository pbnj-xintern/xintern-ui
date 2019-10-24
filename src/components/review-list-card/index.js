/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import * as styles from './review-list-card.emotion'
import Logo from '../../logo192.png'
import axios from 'axios'

import { Card, Row, Col } from 'antd'

const getPopulatedReview = async (props) => {
    try {
        let response = await axios.get(`https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/populated-review/${props.reviewId}`)
        if (response == null) console.error("No response, get request failed.")
        return response
    } catch (err) {
        console.error(404, "Could not get review.")
    }
}

const ReviewListCard = (props) => {
    const [companyLogo, setCompanyLogo] = useState("")
    const [reviewTitle, setReviewTitle] = useState("Review Title")
    const [companyName, setCompanyName] = useState("Company Name")
    const [username, setUsername] = useState("username")
    const [createdAtDate, setCreatedAtDate] = useState("")

    const [overallRating, setOverallRating] = useState("4.5")
    const [upvotes, setUpvotes] = useState([])
    const [downvotes, setDownvotes] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        let review = getPopulatedReview(props)
        //setStates
        // setCompanyLogo(review.)
    }, [])


    return (
        <Card css={styles.CardContainer} bordered={false} bodyStyle={styles.CardBodyStyle}>
            <Row style={{ height: '100%' }}>
                <Col xl={{ span: 3 }} style={{ height: '100%' }}>
                    <div css={styles.CompanyLogoContainer}>
                        <img src={Logo} style={{ objectFit: 'contain', width: '75%' }} alt="company_logo" />
                    </div>
                </Col >
                <Col xl={{ span: 11 }} style={{ height: '100%' }}>
                    <div css={styles.ReviewInfoContainer}>
                        <h4 css={styles.ReviewText}>{reviewTitle}</h4>
                        <h4 css={styles.ReviewText}>{companyName}</h4>
                        <div css={styles.MetaDataContainer}>
                            <h4 css={styles.ReviewText}>{username}</h4>
                            <h4 css={styles.ReviewText}>date/time</h4>
                        </div>
                    </div>             
                </Col>
                <Col xl={{ span: 10 }} style={{ height: '100%' }}>
                    <div css={styles.ReviewRatingsContainer}>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>{overallRating}</h3>
                            <h6 css={styles.RatingLabel} >rating</h6>
                        </div>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>123</h3>
                            <h6 css={styles.RatingLabel}>upvotes</h6>
                        </div>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>12</h3>
                            <h6 css={styles.RatingLabel}>downvotes</h6>
                        </div>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>4321</h3>
                            <h6 css={styles.RatingLabel}>comments</h6>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default ReviewListCard

// (
//     <div css={styles.CardContainer}>
//         <div css={styles.CompanyLogoContainer}>
//             <img src={Logo} style={{ objectFit: 'contain', width: '70%' }} alt="company_logo" />
//         </div>
//         <div css={styles.ContentContainer}>
//             <div css={styles.ReviewInfoContainer}>
//                 <h4 css={styles.ReviewText}>{reviewTitle}</h4>
//                 <h4 css={styles.ReviewText}>{companyName}</h4>
//                 <div css={styles.MetaDataContainer}>
//                     <h4 css={styles.ReviewText}>{username}</h4>
//                     <h4 css={styles.ReviewText}>date/time</h4>
//                 </div>
//             </div>
//             <div css={styles.ReviewRatingsContainer}>
//                 <div css={styles.RatingContainer}>
//                     <h3 css={styles.RatingValue} style={{ color: 'gold' }}>{overallRating}</h3>
//                     <h6 css={styles.RatingLabel} >rating</h6>
//                 </div>
//                 <div css={styles.RatingContainer}>
//                     <h3 css={styles.RatingValue}>123</h3>
//                     <h6 css={styles.RatingLabel}>upvotes</h6>
//                 </div>
//                 <div css={styles.RatingContainer}>
//                     <h3 css={styles.RatingValue}>12</h3>
//                     <h6 css={styles.RatingLabel}>downvotes</h6>
//                 </div>
//                 <div css={styles.RatingContainer}>
//                     <h3 css={styles.RatingValue}>4321</h3>
//                     <h6 css={styles.RatingLabel}>comments</h6>
//                 </div>
//             </div>
//         </div>
//     </div>
// )