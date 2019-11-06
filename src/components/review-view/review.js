/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Row, Col, Form, Input, Button } from 'antd'
import * as styles from './review.emotion'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Add Comment
        </Button>
        </Form.Item>
    </div>
)

const getAllComments = async () => {

}


const getPopulatedReview = async (reviewId) => {
    try {
        console.log("hello im here")
        let response = await axios.get(`https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/populated-review/${reviewId}`)
        if (response.data.error) {
            console.error("no review to pull")
            return {}
        }
        console.log("response data:\n", response.data)
        return response.data
    } catch (err) {
        console.error("error getting a populated review")
    }
}    

const Review = () => {
    // const [reviewObj, setReviewObject] = useState({})    
    const [commentInput, setCommentInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const location = useLocation()

    const reviewObj = location.reviewObject
    console.log("review obj test:\n", reviewObj)
    // const reviewId = location.pathname.substring(8, location.pathname.length)
    // console.log("reviewId:", reviewId)

    useEffect( async () => {
        // const fetchReview = async () => {
        //     let review = await getPopulatedReview(reviewId)
        //     console.log("test:", review)
        //     setReviewObject(review)
        //     console.log("fetched review:\n", reviewObj)
        // }
        // fetchReview()
        // console.log("fetched review:\n", reviewObj)

        // const getPopulatedReview = async (reviewId) => {
        //     try {
        //         console.log("hello im here")
        //         let response = await axios.get(`https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/populated-review/${reviewId}`)
        //         if (response.data.error) {
        //             console.error("no review to pull")
        //             return {}
        //         }
        //         console.log("response data:\n", response.data)
        //         return response.data
        //     } catch (err) {
        //         console.error("error getting a populated review")
        //     }
        // }    
        // setReviewObject(await getPopulatedReview(reviewId))
        // console.log("fetched review:\n", reviewObj)
    }, [])

    const handleSubmit = () => {
        console.log("hello")
    }

    const handleChange = e => {
        setCommentInput(e.target.value)
    }

    //grab reviewId from url path and make http call to retrieve review with review Id
    return (
        <Row style={{ height: "100vh", width: "100%", paddingTop: "3%", overflowY: "scroll" }}>
            <Col xl={{ span: 16, offset: 4 }} css={styles.ReviewViewCol}>
                <div css={styles.CompanyContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 3 }} css={styles.CompanyLogoCol}>
                            <div css={styles.CompanyLogoContainer}>
                                <img src={reviewObj.company_logo} style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                            </div>
                        </Col>
                        <Col xl={{ span: 21 }} css={styles.CompanyNameCol}>
                            <h1 style={{ fontWeight: "500" }}>{reviewObj.company_name}</h1>
                        </Col>
                    </Row>
                </div>
                <div css={styles.RatingsContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col lg={{ span: 24 }} xl={{ span: 10 }} css={styles.ReviewRatingCol}>
                            <div css={styles.ReviewRatingsContainer}>
                                <div css={styles.RatingContainer}>
                                    {/* <h3 css={styles.RatingValue}>{(reviewObj.rating.culture === null) ? "N/A" : reviewObj.rating.culture.toFixed(1)}</h3> */}
                                    <h6 css={styles.RatingLabel} >culture</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    {/* <h3 css={styles.RatingValue}>{(reviewObj.rating.mentorship === null) ? "N/A" : reviewObj.rating.mentorship.toFixed(1)}</h3> */}
                                    <h6 css={styles.RatingLabel}>mentorship</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    {/* <h3 css={styles.RatingValue}>{(reviewObj.rating.impact === null) ? "N/A" : reviewObj.rating.impact.toFixed(1)}</h3> */}
                                    <h6 css={styles.RatingLabel}>impact</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    {/* <h3 css={styles.RatingValue}>{(reviewObj.rating.interview === null) ? "N/A" : reviewObj.rating.interview.toFixed(1)}</h3> */}
                                    <h6 css={styles.RatingLabel}>interview</h6>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.MetadataContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 6 }}>
                            <p css={styles.MetaText} style={{ paddingLeft: "0.5%" }}>{reviewObj.username}</p>
                        </Col>
                        <Col xl={{ span: 18 }}>
                            <p css={styles.MetaText}>{reviewObj.created_at}</p>
                        </Col>
                    </Row>
                </div>
                <div css={styles.ContentContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 24 }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p style={{ textAlign: "justify", color: "black", fontWeight: "350", fontSize: "16px", marginBottom: "0" }}>"{reviewObj.content}"</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.UpvoteDownvoteContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 2 }}>
                            <div style={{ display: "flex", cursor: "pointer", width: "fit-content" }}>
                                <p css={styles.MetaText} style={{ paddingLeft: "0.5%", fontWeight: "700", fontSize: "14px" }}>{reviewObj.upvotes_count}</p>
                                <svg stroke="green" fill="transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -3 40 40"><path d="M7 11h-6l11-11 11 11h-6v13h-10z"/></svg>
                            </div>
                        </Col>
                        <Col xl={{ span: 22 }}>
                            <div style={{ display: "flex", cursor: "pointer", width: "fit-content" }}>
                                <p css={styles.MetaText} style={{ fontWeight: "700", fontSize: "14px" }}>{reviewObj.downvotes_count}</p>
                                <svg stroke="red" fill="transparent" style={{ transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-10 -11 40 40"><path d="M7 11h-6l11-11 11 11h-6v13h-10z"/></svg>                                    
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.CreateCommentContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 24 }}>
                            <Comment
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={handleChange}
                                        onSubmit={handleSubmit}
                                        submitting={isSubmitting}
                                        value={commentInput}
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </div>
                <div css={styles.CommentsContainer}>
                    comment section
                </div>
            </Col>
        </Row>
    )
}

export default Review