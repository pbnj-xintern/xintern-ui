/** @jsx jsx */ import { jsx } from '@emotion/core'
import CommentCard from '../../components/comment-card/comment-card'

const CommentSection = props => {

    return (
        <div>
            {
                props.data.map(comment => <CommentCard {...comment} />)
            }
        </div>
    )
}

export default CommentSection