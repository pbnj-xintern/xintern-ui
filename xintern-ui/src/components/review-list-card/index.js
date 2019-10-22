/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import * as styles from './review-list-card.emotion'
import Logo from '../../logo192.png'

const ReviewListCard = () => {
    const [companyLogo, setCompanyLogo] = useState("")
    const [reviewTitle, setReviewTitle] = useState("Review Title")
    const [companyName, setCompanyName] = useState("Company Name")
    const [username, setUsername] = useState("username")

    const [overallRating, setOverallRating] = useState("4.5")
    const [upvotes, setUpvotes] = useState([])
    const [downvotes, setDownvotes] = useState([])
    const [comments, setComments] = useState([])

    return (
        <div css={styles.CardContainer}>
            <div css={styles.CompanyLogoContainer}>
                <img src={Logo} style={{ objectFit: 'contain', width: '70%' }} alt="company_logo" />
            </div>
            <div css={styles.ContentContainer}>
                <div css={styles.ReviewInfoContainer}>
                    <h4 css={styles.ReviewText}>{reviewTitle}</h4>
                    <h4 css={styles.ReviewText}>{companyName}</h4>
                    <div css={styles.MetaDataContainer}>
                        <h4 css={styles.ReviewText}>{username}</h4>
                        <h4 css={styles.ReviewText}>date/time</h4>
                    </div>
                </div>
                <div css={styles.ReviewRatingsContainer}>
                    <div css={styles.RatingContainer}>
                        <h3 css={styles.RatingValue}>{overallRating}</h3>
                        <h6 css={styles.RatingLabel}>rating label</h6>
                    </div>
                    <div css={styles.RatingContainer}>
                        <h3 css={styles.RatingValue}>123</h3>
                        <h6 css={styles.RatingLabel}>upvotes</h6>
                    </div>
                    <div css={styles.RatingContainer}>
                        <h3 css={styles.RatingValue}>12</h3>
                        <h6 css={styles.RatingLabel}>downvotes</h6>
                    </div>
                    <div css={styles.RatingContainer}>
                        <h3 css={styles.RatingValue}>4321</h3>
                        <h6 css={styles.RatingLabel}>comments</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewListCard