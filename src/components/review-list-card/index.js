/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import * as styles from './review-list-card.emotion'

import { Card, Row, Col, Anchor } from 'antd'

const ReviewListCard = (props) => {
    const [reviewObj, setReviewObj] = useState({})

    const { Link } = Anchor

    useEffect(async () => {
        const getAllMetrics = async (props) => {
            let allRatings = [props.rating.culture, props.rating.mentorship, props.rating.impact, props.rating.interview]
            allRatings = allRatings.filter(rating => rating !== null)
            let upvotesCount = props.upvotes.length
            let downvotesCount = props.downvotes.length
            let commentsCount = props.comments.length
            let overallRating = ((allRatings.reduce((a, b) => a + b, 0)) / allRatings.length).toFixed(1)
            return { overallRating, upvotesCount, downvotesCount, commentsCount }
        }
        let metrics = await getAllMetrics(props)
        let dateFormatOptions = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, 
            timeZone: "America/Los_Angeles"
        }
        let formattedCreatedAt = new Date(props.createdAt).toLocaleString('en-US', dateFormatOptions)
        setReviewObj({
            company_logo: props.company.logo,
            content: props.content,
            company_name: props.company.name,
            username: props.user.username,
            created_at: formattedCreatedAt,
            overall_rating: metrics.overallRating,
            upvotes_count: metrics.upvotesCount,
            downvotes_count: metrics.downvotesCount,
            comments_count: metrics.commentsCount
        })
    }, [])

    return (
        <Card css={styles.CardContainer} bordered={false} bodyStyle={styles.CardBodyStyle}>
            <Row style={{ height: '100%' }}>
                <Col xl={{ span: 3 }} style={{ height: '100%' }}>
                    <div css={styles.CompanyLogoContainer}>
                        <img src={reviewObj.company_logo} style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                    </div>
                </Col >
                <Col xl={{ span: 11 }} style={{ height: '100%' }}>
                    <div css={styles.ReviewInfoContainer}>
                        <h4 css={styles.ReviewText} style={{ fontWeight: "250", fontStyle: "italic" }}>"{reviewObj.content && reviewObj.content.substring(0, 40) + '...'}"</h4>
                        <h4 css={styles.ReviewText} style={{ marginBottom: "2%", fontWeight: "400", color: "darkblue" }}>{reviewObj.company_name}</h4>
                        <div css={styles.MetaDataContainer}>
                            <h4 css={styles.ReviewText}>
                                <Anchor>
                                    <Link href="#" title={reviewObj.username} style={{ fontSize: '15px', fontWeight: "500" }} />
                                </Anchor>
                            </h4>
                            <h4 css={styles.DateReviewText} >{reviewObj.created_at}</h4>
                        </div>
                    </div>
                </Col>
                <Col xl={{ span: 10 }} style={{ height: '100%' }}>
                    <div css={styles.ReviewRatingsContainer}>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'darkblue' }}>{reviewObj.overall_rating}</h3>
                            <h6 css={styles.RatingLabel} >rating</h6>
                        </div>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>{reviewObj.upvotes_count}</h3>
                            <h6 css={styles.RatingLabel}>upvotes</h6>
                        </div>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>{reviewObj.downvotes_count}</h3>
                            <h6 css={styles.RatingLabel}>downvotes</h6>
                        </div>
                        <div css={styles.RatingContainer}>
                            <h3 css={styles.RatingValue} style={{ color: 'black' }}>{reviewObj.comments_count}</h3>
                            <h6 css={styles.RatingLabel}>comments</h6>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default ReviewListCard