/** @jsx jsx */ import { jsx } from '@emotion/core'
import {  Comment, Tooltip, Icon, Card } from 'antd'
import moment from 'moment'

const CommentCard = props => {

    var upvote = () => { }
    var downvote = () => { }

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Upvotes">
                <Icon
                    type="like"
                    theme={'filled'}
                    onClick={upvote}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.upvotes.length}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Downvotes">
                <Icon
                    type="dislike"
                    theme={'outlined'}
                    onClick={downvote}
                />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.downvotes.length}</span>
        </span>,
        <span key="comment-basic-reply-to">Reply to this comment</span>,
    ];


    return (
        <Card bordered={false}
            style={{
                marginTop: '0.5em',
                marginBottom: '0.5em',
                // marginLeft: '1em',
                marginRight: '1em',
                boxShadow: props.parentComment ? 'none' : '6px 10px 31px -17px rgba(0,0,0,0.3)',
                borderLeft: '1px solid black'
            }}
            bodyStyle={{
                padding: "0",
                paddingLeft: "1em"
            }}>
            <Comment
                actions={actions}
                author={<a>USERNAME HERE</a>}
                content={props.content}
                datetime={
                    <Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            >
                {props.replies && props.replies.map(reply => <CommentCard {...reply} />)}
            </Comment>
        </Card>
    )
}

export default CommentCard