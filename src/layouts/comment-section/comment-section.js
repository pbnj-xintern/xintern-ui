/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import CommentCard from '../../components/comment-card/comment-card'

const CommentSection = props => {

    return (
        <div>
            {
                props.data.map(comment => <CommentCard {...comment} postReply= {props.postReply} />)
            }
        </div>
    )
}

export default CommentSection