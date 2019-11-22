/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Modal, Comment, Avatar, Row, Col, Form, Input, Button, Icon } from 'antd'
import * as styles from './review.emotion'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import CommentSection from '../../layouts/comment-section/comment-section'
import { toast } from 'react-toastify'
import { totalmem } from 'os'
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
        let response = await axios.get(`/comments/${reviewId}`)
        if (response.data.error) {
            console.error("no comments to pull")
            return []
        }
        return response.data
    } catch (err) {
        console.error("error getting comments")
    }
}

const getReviewById = async (reviewId) => {
    try {
        let response = await axios.get(`/review/${reviewId}`)
        if (response.data.error) {
            console.error("no review to pull")
            return {}
        }
        return response.data
    } catch (err) {
        console.error("error getting a populated review")
    }
}

const Review = () => {
    const [reviewObj, setReviewObj] = useState({
        rating: {},
        company: {},
        user: {},
        upvotes: [],
        downvotes: []
    })

    // const [salaryValue, setSalaryValue] = useState(0)
    const [commentsList, setCommentsList] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isReviewUpvote, setIsReviewUpvote] = useState(false)
    const [isReviewDownvote, setIsReviewDownvote] = useState(false)
    const [isReviewVotePending, setReviewVotePending] = useState(false)

    const location = useLocation()
    const reviewId = location.pathname.substring(8, location.pathname.length)
    let [replyTo, setReplyTo] = useState("")
    const voteItem = {
        COMMENT: "COMMENT",
        REVIEW: "REVIEW"
    }

    const voteType = {
        UP: "UP",
        DOWN: "DOWN"
    }

    const reviewEndpoint = {
        UP: `/review/${reviewId}/upvote`,
        DOWN: `/review/${reviewId}/downvote`
    }




    useEffect(() => {
        const userId = localStorage.getItem('uid');
        window.scrollTo({ top: 0 })
        const fetchReview = async () => {

            let review = await getReviewById(reviewId);
            setReviewObj(review)
            setIsReviewUpvote(review.upvotes.includes(userId))
            setIsReviewDownvote(review.downvotes.includes(userId));
        }
        const fetchComments = async () => {
            setCommentsList(await getPopulatedComments(reviewId))
        }
        fetchReview()
        fetchComments()
    }, [reviewId])

    const handleSubmit = () => {
        let uid = localStorage.getItem('uid');
        if (uid){
            axios.post(`review/${reviewId}/comment`, {
                parent_comment_id: replyTo,
                content: commentInput,
                author: uid
            }).then(res => {
                res.data.comment.author = {username: "You"}
                setCommentsList(commentsList.concat(res.data.comment))
                setCommentInput("");
                setReplyTo("")
            })
        }else if (!toast.isActive('vote')){
            toast.error("Login to upvote/downvote!", {
                toastId: "vote"
            });   
        }
    }

    const handleChange = e => {
        setCommentInput(e.target.value)
    }

    const handleVote = async (item, type, endpoint) => {
        if (!localStorage.getItem('uid')) {
            if (!toast.isActive('vote'))
                toast.error("Login to upvote/downvote!", {
                    toastId: "vote"
                });

        } else {
            setReviewVotePending(true)
            axios.patch(endpoint)
                .then(res => {
                    let uid = localStorage.getItem('uid');
                    let message = type == voteType.UP ? "Successfully upvoted." : "Successfully downvoted."
                    setReviewVotePending(false)
                    setIsReviewUpvote(res.data.upvotes.includes(uid))
                    setIsReviewDownvote(res.data.downvotes.includes(uid))
                    toast.success(message)
                    setReviewObj({
                        ...reviewObj,
                        upvotes: res.data.upvotes,
                        downvotes: res.data.downvotes
                    })
                })
        }
    }

    const formatSalary = (salary) => {
        let formattedSalary = 0
        if (reviewObj.currency === "CAD" || reviewObj.currency === "USD") {
            formattedSalary = (salary / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                        <Col xl={{ span: 17 }} css={styles.CompanyNameCol}>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", alignItems: "center" }}>
                                <h1 style={{ fontWeight: "500", paddingRight: "4%", marginBottom: "0" }}><Link to={`/company/${reviewObj.company._id}/reviews`} css={styles.CompanyNameLinkStyle}>{reviewObj.company.name}</Link></h1>
                                <h1 style={{ fontWeight: "100", fontSize: "22px", marginBottom: "0", marginTop: "3.5px" }}>{reviewObj.company.location}</h1>
                            </div>
                        </Col>
                        <Col xl={{ span: 4 }}>
                            <Row style={{ height: "100%", width: "100%" }}>
                                <Button.Group size='large'>
                                    <Button
                                        loading={isReviewVotePending}
                                        onClick={() => handleVote(voteItem.REVIEW, voteType.UP, reviewEndpoint.UP)}
                                        ghost={!isReviewUpvote}
                                        style={{ color: isReviewUpvote ? '#fff' : '#07bc0c', backgroundColor: '#07bc0c', borderColor: '#07bc0c' }}
                                    >
                                        <Icon type='up'></Icon>
                                        {(reviewObj.upvotes) ? reviewObj.upvotes.length : 0}
                                    </Button>
                                    <Button
                                        loading={isReviewVotePending}
                                        onClick={() => handleVote(voteItem.REVIEW, voteType.DOWN, reviewEndpoint.DOWN)}
                                        ghost={!isReviewDownvote}
                                        style={{ color: isReviewDownvote ? '#fff' : '#ff4d4f', backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                                    >
                                        <Icon type='down'></Icon>
                                        {(reviewObj.downvotes) ? reviewObj.downvotes.length : 0}
                                    </Button>
                                </Button.Group>
                            </Row>
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
                            <Link to={`/user/${reviewObj.user._id}`}>
                                <p css={styles.MetaText} style={{ paddingLeft: "0.5%", width: "fit-content" }}>
                                    <Icon type="user" style={{ marginRight: '1em' }}></Icon>
                                    {reviewObj.user.username}
                                </p>
                            </Link>
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
                            <CommentSection data={commentsList} postReply = {author => console.log(author)}/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Review