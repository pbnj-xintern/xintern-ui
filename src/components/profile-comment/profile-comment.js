/** @jsx jsx */ import { jsx } from '@emotion/core'
import * as styles from './user-profile.emotion'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
const { TabPane } = Tabs;

const ProfileComment = props => {

    const getCommentsByUserId = async (reviewId) => {
        try {
            let response = await axios.get(`/comments/${reviewId}`)
            if (response.data.error) {
                return []
            }
            return response.data
        } catch (err) {
            console.error("error getting comments")
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem('uid');
        const fetchComments = async () => {

            let comments = await getCommentsByUserId(userId);
            setReviewObj(review)
            setIsReviewUpvote(review.upvotes.includes(userId))
            setIsReviewDownvote(review.downvotes.includes(userId));
        }
        const fetchComments = async () => {
            setCommentsList(await getPopulatedComments(reviewId))
        }
        fetchReview()
        fetchComments()
    }, [])


    return (

        <div css={styles.Tabs}>

            <Tabs >
                <TabPane tab="Comments" key="1">
                    Content of Tab Pane 1
            </TabPane>
                <TabPane tab="Reviews" key="2">
                    Content of Tab Pane 2
             </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
             </TabPane>
            </Tabs>
        </div>
    )
}

export default ProfileComment