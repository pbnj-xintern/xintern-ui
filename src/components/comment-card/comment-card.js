/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Modal, Input, Form, Button, Comment, Tooltip, Icon, Card } from 'antd'
import moment from 'moment'
import * as styles from './comment-card.emotion'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'




const CommentCard = props => {

    var upvote = () => { }
    var downvote = () => { }

    const vote = () => {

    }

    const [modalVisible, setModalVisible] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [replyTo, setReplyTo] = useState("")
    const [replyToProp, setReplyToProp] = useState({})
    const [commentInput, setCommentInput] = useState("")
    const { TextArea } = Input
    const ReplyModal = () => {
        return (
            <Modal
                title={`Reply to: ${replyTo}`}
                centered
                style={{ top: 20 }}
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                okText="Submit"


            >
                <div>
                    <TextArea rows={4} onChange={handleChange} value={commentInput} />
                    <Button styles={"left: 10%"} htmlType="submit" loading={false} onClick={handleSubmit} type="primary">
                        Add Comment
                </Button>
                </div>

            </Modal>
        )
    }

    function countDown() {
        const modal = Modal.success({
            title: <div>
                <TextArea rows={4} onChange={handleChange} value={commentInput} />
                <Button styles={"left: 10%"} htmlType="submit" loading={false} onClick={handleSubmit} type="primary">
                    Add Comment
                </Button>
            </div>,
            content: commentInput

            ,
        });

    }

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

    const handleChange = e => {
        console.log('handlechange is fired')
        setCommentInput(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = () => {
        console.log("hello")
        //replyToProp.postReply(replyToProp.username)
    }

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Upvotes">
                <Icon
                    type="up"
                    theme={'filled'}
                    onClick={upvote}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.upvotes.length}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Downvotes">
                <Icon
                    type="down"
                    theme={'outlined'}
                    onClick={() => vote()}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.downvotes.length}</span>
        </span>,
        <span key="comment-basic-reply-to" onClick={() => setModalVisible(true)}>Reply to this comment</span>,
    ];

    return (
        <Card bordered={false}
            style={{
                marginTop: '0.5em',
                marginBottom: '0.5em',
                // marginLeft: '1em',
                marginRight: '1em',
                boxShadow: props.parentComment ? 'none' : '6px 10px 31px -17px rgba(0,0,0,0.3)',
                borderLeft: '1px solid black',
                // borderRadius: '0'
            }}
            bodyStyle={{
                padding: "0",
                paddingLeft: "1em"
            }}>
            <Comment
                actions={actions}
                author={<Link to={`/user/${props.author._id}`} css={styles.UsernameLink}>{props.author.username}</Link>}
                content={props.content}
                datetime={
                    <Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            >
                <Comment
                                
                                content={
                                    <Editor
                                        onChange={handleChange}
                                        onSubmit={handleSubmit}
                                        submitting={isSubmitting}
                                        value={commentInput}
                                    />
                                }
                            />
                
                {props.replies && props.replies.map(reply => <CommentCard {...reply} />)}

            </Comment>
            

        </Card>
    )
}

export default CommentCard