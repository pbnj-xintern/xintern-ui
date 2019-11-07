/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Row, Col, Form, Input, Button } from 'antd'
import * as styles from './review.emotion'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import CommentSection from '../../layouts/comment-section/comment-section'
// import mockData from './mock-comments'

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

const getPopulatedComments = async (reviewId) => {
    try {
        let response = await axios.get(`https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/comments/${reviewId}`)
        if (response.data.error) {
            console.error("no comments to pull")
            return []
        }
        console.log("response data:\n", response.data)
        return response.data
    } catch (err) {
        console.error("error getting comments")
    }
} 

const getReviewById = async (reviewId) => {
    try {
        let response = await axios.get(`https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/review/${reviewId}`)
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
    const [reviewObj, setReviewObj] = useState({
        rating: {},
        company: {},
        user: {}
    })
    // const [salaryValue, setSalaryValue] = useState(0)
    const [commentsList, setCommentsList] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const location = useLocation()
    const reviewId = location.pathname.substring(8, location.pathname.length)

    useEffect(() => {
        window.scrollTo({ top: 0 })
        const fetchReview = async () => {
            setReviewObj(await getReviewById(reviewId))
        }
        const fetchComments = async () => {
            setCommentsList(await getPopulatedComments(reviewId))
        }
        fetchReview()
        fetchComments()
    }, [reviewId])

    const handleSubmit = () => {
        console.log("hello")
    }

    const handleChange = e => {
        setCommentInput(e.target.value)
    }

    const formatSalary = (salary) => {
        let formattedSalary = 0
        if (reviewObj.currency === "CAD" || reviewObj.currency === "USD") {
            formattedSalary = (salary/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } else {
            formattedSalary = salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        return formattedSalary
    }

    return (
        <Row style={{ height: "100%", width: "100%", paddingTop: "7%", paddingBottom: "3%", overflowY: "scroll" }}>
            <Col xl={{ span: 16, offset: 4 }} css={styles.ReviewViewCol}>
                <div css={styles.CompanyContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 3 }} css={styles.CompanyLogoCol}>
                            <div css={styles.CompanyLogoContainer}>
                                <img src={reviewObj.company.logo} style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                            </div>
                        </Col>
                        <Col xl={{ span: 21 }} css={styles.CompanyNameCol}>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", alignItems: "center" }}>
                                <h1 style={{ fontWeight: "500", paddingRight: "4%", marginBottom: "0" }}><Link to={`/company/${reviewObj.company._id}`} css={styles.CompanyNameLinkStyle}>{reviewObj.company.name}</Link></h1>
                                <h1 style={{ fontWeight: "100", fontSize: "22px", marginBottom: "0", marginTop: "3.5px" }}>{reviewObj.company.location}</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.RatingsContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 12 }} css={styles.ReviewPosSalCol}>
                            <div css={styles.ReviewPositionSalaryContainer}>
                                <h3 css={styles.MetaText} style={{ marginBottom: "2.5%" }}><b style={{ paddingRight: "2%" }}>Position:</b> {reviewObj.position}</h3>
                                <h3 css={styles.MetaText}><b style={{ paddingRight: "4.5%" }}>Salary:</b> ${reviewObj.salary ? formatSalary(reviewObj.salary) : "N/A"} {reviewObj.currency}</h3>
                            </div>
                        </Col>
                        <Col lg={{ span: 24 }} xl={{ span: 12 }} css={styles.ReviewRatingCol}>
                            <div css={styles.ReviewRatingsContainer}>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>{!reviewObj.rating.culture ? "N/A" : reviewObj.rating.culture.toFixed(1)}</h3>
                                    <h6 css={styles.RatingLabel} >culture</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>{!reviewObj.rating.mentorship ? "N/A" : reviewObj.rating.mentorship.toFixed(1)}</h3>
                                    <h6 css={styles.RatingLabel}>mentorship</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>{!reviewObj.rating.impact ? "N/A" : reviewObj.rating.impact.toFixed(1)}</h3>
                                    <h6 css={styles.RatingLabel}>impact</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>{!reviewObj.rating.interview ? "N/A" : reviewObj.rating.interview.toFixed(1)}</h3>
                                    <h6 css={styles.RatingLabel}>interview</h6>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.MetadataContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 6 }}>
                            <Link to={`/user/${reviewObj.user._id}`}><p css={styles.MetaText} style={{ paddingLeft: "0.5%", width: "fit-content" }}>{reviewObj.user.username}</p></Link>
                        </Col>
                        <Col xl={{ span: 18 }}>
                            <p css={styles.MetaText}>{moment(reviewObj.createdAt).format('llll')}</p>
                        </Col>
                    </Row>
                </div>
                <div css={styles.ContentContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 24 }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p style={{ textAlign: "justify", color: "black", fontWeight: "500", fontSize: "16px", marginBottom: "0" }}>"{reviewObj.content}"</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.UpvoteDownvoteContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 2 }}>
                            <div style={{ display: "flex", cursor: "pointer", width: "fit-content" }}>
                                <p css={styles.MetaText} style={{ paddingLeft: "0.5%", fontWeight: "700", fontSize: "14px" }}>{(reviewObj.upvotes) ? reviewObj.upvotes.length : 0}</p>
                                <svg stroke="green" fill="transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 2 26 26"><path d="M7 11h-6l11-11 11 11h-6v13h-10z"/></svg>
                            </div>
                        </Col>
                        <Col xl={{ span: 22 }}>
                            <div style={{ display: "flex", cursor: "pointer", width: "fit-content" }}>
                                <p css={styles.MetaText} style={{ fontWeight: "700", fontSize: "14px" }}>{(reviewObj.downvotes) ? reviewObj.downvotes.length : 0}</p>
                                <svg stroke="red" fill="transparent" style={{ transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -3 25.5 25.5"><path d="M7 11h-6l11-11 11 11h-6v13h-10z"/></svg>                                    
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
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 24 }} style={{ paddingTop: "1%" }}>
                            <CommentSection data={commentsList} />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Review