/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Row, Col, Form, Input, Button } from 'antd'
import * as styles from './review.emotion'
import { useLocation } from 'react-router-dom'

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
);

const Review = (props) => {
    const [reviewObj, setReviewObj] = useState({})    
    const [commentInput, setCommentInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const location = useLocation()
    console.log("location", location)
    console.log("path reviewID:", location.pathname.substring(8, location.pathname.length))
    const reviewId = location.pathname.substring(8, location.pathname.length)

    const handleSubmit = () => {
        console.log("hello")
    }

    const handleChange = e => {
        setCommentInput(e.target.value)
    }

    //grab reviewId from url path and make http call to retrieve review with review Id
    return (
        <Row style={{ height: "100vh", width: "100%", marginTop: "3%", overflowY: "scroll" }}>
            <Col xl={{ span: 16, offset: 4 }} css={styles.ReviewViewCol}>
                <div css={styles.CompanyContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 3 }} css={styles.CompanyLogoCol}>
                            <div css={styles.CompanyLogoContainer}>
                                <img src="" style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                            </div>
                        </Col>
                        <Col xl={{ span: 21 }} css={styles.CompanyNameCol}>
                            <h1>Company_Name</h1>
                        </Col>
                    </Row>
                </div>
                <div css={styles.RatingsContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col lg={{ span: 24 }} xl={{ span: 10 }} css={styles.ReviewRatingCol}>
                            <div css={styles.ReviewRatingsContainer}>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>1.0</h3>
                                    <h6 css={styles.RatingLabel} >culture</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>2.0</h3>
                                    <h6 css={styles.RatingLabel}>mentorship</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>3.0</h3>
                                    <h6 css={styles.RatingLabel}>impact</h6>
                                </div>
                                <div css={styles.RatingContainer}>
                                    <h3 css={styles.RatingValue}>4.0</h3>
                                    <h6 css={styles.RatingLabel}>interview</h6>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.MetadataContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 6 }}>
                            <p css={styles.MetaText} style={{ paddingLeft: "0.5%" }}>username</p>
                        </Col>
                        <Col xl={{ span: 18 }}>
                            <p css={styles.MetaText}>date posted</p>
                        </Col>
                    </Row>
                </div>
                <div css={styles.ContentContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 24 }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p style={{ textAlign: "left", color: "black", fontWeight: "350", fontSize: "16px" }}>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div css={styles.UpvoteDownvoteContainer}>
                    <Row style={{ height: "100%", width: "100%" }}>
                        <Col xl={{ span: 2 }}>
                            <div style={{ display: "flex" }}>
                                <p css={styles.MetaText} style={{ paddingLeft: "0.5%", fontWeight: "700", fontSize: "14px" }}>10</p>
                                <svg stroke="green" fill="transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -3 40 40"><path d="M7 11h-6l11-11 11 11h-6v13h-10z"/></svg>
                            </div>
                        </Col>
                        <Col xl={{ span: 22 }}>
                            <div style={{ display: "flex" }}>
                                <p css={styles.MetaText} style={{ fontWeight: "700", fontSize: "14px" }}>1</p>
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
            </Col>
        </Row>
    )
}

export default Review