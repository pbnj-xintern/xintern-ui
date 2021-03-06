/** @jsx jsx */ import { jsx } from '@emotion/core'
import {Input, Form, Button, Comment, Tooltip, Icon, Card } from 'antd'
import moment from 'moment'
import * as styles from './comment-card.emotion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'

const CommentCard = props => {

    const UPVOTE_TYPE = 'upvote'
    const DOWNVOTE_TYPE = 'downvote'

    let [upvotes, setUpvotes] = useState([])
    let [downvotes, setDownvotes] = useState([])
    let [votePending, setVotePending] = useState(false)
    let [isDownvoted, setIsDownvoted] = useState(false)
    let [isUpvoted, setIsUpvoted] = useState(false)
    const [showReplies, setShowReplies] = useState(true)
    const [commentInput, setCommentInput] = useState("")
    const [editorVisible, setEditorVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const { TextArea } = Input


    useEffect(() => {
        let initialUid = localStorage.getItem('uid')
        setUpvotes(props.upvotes || [])
        setDownvotes(props.downvotes || [])
        setIsUpvoted(initialUid ? props.upvotes.includes(localStorage.getItem('uid')) : false)
        setIsDownvoted(initialUid ? props.downvotes.includes(localStorage.getItem('uid')) : false)
        if(props.hideReplies){
            setShowReplies(false)
        }
    }, [])

    const handleChange = e => {
        setCommentInput(e.target.value)
    }
    function afterReply() {
        setEditorVisible(false)
        setLoading(false)
    }

    const handleReply = (props) => {
        setLoading(true)
        props.postReply(commentInput, "you", props._id, afterReply)
       
    }

    var voteComment = type => {
        let uid = localStorage.getItem('uid')
        let token = localStorage.getItem('token')
        if (!uid || !token) {
            toast.error('Please login to upvote or downvote a comment')
            return;
        }
        setVotePending(true)
        Axios.patch(`/review/comment/${props._id}/${type}`)
            .then(res => {
                setVotePending(false)
                toast.success('Submitted vote');

                setIsUpvoted(res.data.upvotes.includes(uid))
                setIsDownvoted(res.data.downvotes.includes(uid))

                setUpvotes(res.data.upvotes)
                setDownvotes(res.data.downvotes)
            })
    }

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Upvotes">
                <Icon
                    type={votePending ? 'loading' : "caret-up"}
                    style={{
                        color: isUpvoted ? '#07bc0c' : 'gray'
                    }}
                    theme={votePending ? 'outlined' : "filled"}
                    onClick={() => {if(showReplies) return voteComment(UPVOTE_TYPE)}}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{upvotes.length}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Downvotes">
                <Icon
                    type={votePending ? 'loading' : "caret-down"}
                    style={{
                        color: isDownvoted ? '#ff4d4f' : 'gray'
                    }}
                    theme={votePending ? 'outlined' : "filled"}
                    onClick={() => {if(showReplies) return voteComment(DOWNVOTE_TYPE)}}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{downvotes.length}</span>
        </span>,
        showReplies && <span key="comment-basic-reply-to" onClick={() => setEditorVisible(!editorVisible)}>Reply to this comment</span>,
    ];


    return (
        <Card bordered={false}
            style={{
                marginTop: '0.5em',
                marginBottom: '0.5em',
                marginRight: '1em',
                boxShadow: props.parentComment ? 'none' : '6px 10px 31px -17px rgba(0,0,0,0.05)',
                borderLeft: '1px solid black',
            }}
            bodyStyle={{
                padding: "0",
                paddingLeft: "1em"
            }}>
            <Comment
                actions={actions}
                author={<Link to={`/profile/${props.author.username}`} css={styles.UsernameLink}>{props.author.username}</Link>}
                content={props.content}
                datetime={
                    <Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            >
                {
                    editorVisible && showReplies &&
                    <div style={{ paddingRight: '4%' }}>
                        <Form.Item>
                            <TextArea rows={4} onChange={handleChange} onPressEnter={() => handleReply(props)} value={commentInput} disabled={loading} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" onClick={() => handleReply(props)} type="primary" loading={loading} >
                                Add Comment
                            </Button>
                        </Form.Item>
                    </div>
                }
                {props.replies && showReplies && props.replies.map(reply => <CommentCard {...reply} postReply= {props.postReply} />)}
            </Comment>
        </Card>
    )
}

export default CommentCard