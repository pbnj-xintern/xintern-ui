/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Anchor, Card, Col, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as styles from './review-list-card.emotion'


const ReviewListCard = (props) => {
    const [reviewObj, setReviewObj] = useState({})

    const getAllMetrics = (props) => {
        let allRatings = [props.rating.culture, props.rating.mentorship, props.rating.impact, props.rating.interview]
        allRatings = allRatings.filter(rating => rating !== null)
        let upvotesCount = props.upvotes.length
        let downvotesCount = props.downvotes.length
        let commentsCount = props.comments.length
        let overallRating = ((allRatings.reduce((a, b) => a + b, 0)) / allRatings.length).toFixed(1)
        return { overallRating, upvotesCount, downvotesCount, commentsCount }
    }

    useEffect(() => {

        let metrics = getAllMetrics(props)
        let formattedCreatedAt = moment(props.createdAt).format("llll")
        setReviewObj({
            _id: props._id,
            content: props.content,
            position: props.position,
            company_logo: props.company.logo,
            company_name: props.company.name,
            company_location: props.company.location,
            username: props.user.username,
            created_at: formattedCreatedAt,
            overall_rating: metrics.overallRating,
            upvotes_count: metrics.upvotesCount,
            downvotes_count: metrics.downvotesCount,
            comments_count: metrics.commentsCount,
            review_ratings: props.rating
        })
    }, [])

    return (
        <Card css={styles.CardContainer} bordered={false} bodyStyle={styles.CardBodyStyle}>
            {/* <NavLink to={{ pathname: `/review/${reviewObj._id}`, reviewObject: {...reviewObj} }}> */}
            <NavLink to={`/review/${reviewObj._id}`}>
                <Row style={{ height: '100%' }}>
                    <Col lg={{ span: 4 }} xl={{ span: 3 }} css={styles.CompanyLogoCol}>
                        <div css={styles.CompanyLogoContainer}>
                            <img src={reviewObj.company_logo} style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                        </div>
                    </Col >
                    <Col lg={{ span: 20 }} xl={{ span: 11 }} css={styles.ReviewInfoCol}>
                        <div css={styles.ReviewInfoContainer}>
                            <h4 css={styles.ReviewText} style={{ fontWeight: "250", paddingBottom: "1%", fontStyle: "normal" }}>{reviewObj.position && reviewObj.position}</h4>
                            {/* "{reviewObj.content && reviewObj.content.substring(0, 35) + "..."}" */}
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h4 css={styles.ReviewText} style={{ marginBottom: "2%", fontWeight: "400", color: "darkblue" }}>{reviewObj.company_name}</h4>
                                <h4 css={styles.LocationText}>{reviewObj.company_location}</h4>
                            </div>
                            <div css={styles.MetaDataContainer}>
                                <h4 css={styles.ReviewText}>
                                    <Anchor affix={false} style={{ width: "125px" }}>
                                        <h4 css={styles.ReviewText} style={{ fontSize: '12px', fontWeight: "300" }}>{reviewObj.username}</h4>
                                        {/* <Link href="#" title={reviewObj.username} style={{ fontSize: '15px', fontWeight: "500" }} /> */}
                                    </Anchor>
                                </h4>
                                <h4 css={styles.DateReviewText} >{reviewObj.created_at}</h4>
                            </div>
                        </div>
                    </Col>
                    <Col lg={{ span: 24 }} xl={{ span: 10 }} css={styles.ReviewRatingCol}>
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
            </NavLink>
        </Card>
    )
}

export default ReviewListCard