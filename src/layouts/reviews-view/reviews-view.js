/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import CommentCard from '../../components/comment-card/comment-card'

const CommentSection = d => {

    const props = [
        {
            "createdAt": "2019-09-24T02:58:20.498Z",
            "upvotes": [],
            "downvotes": [],
            "flagged": false,
            "_id": "5d89864cca3f950007aa63e8",
            "content": "Praiyons Comment 1",
            "parentComment": "5d895971e9adca00082a6bed",
            "__v": 0,
            "replies": [
                {
                    "createdAt": "2019-09-24T02:58:20.498Z",
                    "upvotes": [],
                    "downvotes": [],
                    "flagged": false,
                    "_id": "5d898667ca3f950007aa63e9",
                    "content": "Praiyons Comment 1",
                    "parentComment": "5d89864cca3f950007aa63e8",
                    "__v": 0,
                    "replies": [
                        {
                            "createdAt": "2019-09-25T16:45:03.489Z",
                            "upvotes": [],
                            "downvotes": [],
                            "flagged": false,
                            "_id": "5d8b99ded0c6c60008047c8c",
                            "content": "testing order1",
                            "parentComment": "5d898667ca3f950007aa63e9",
                            "__v": 0
                        }
                    ]
                },
                {
                    "createdAt": "2019-09-25T16:45:03.489Z",
                    "upvotes": [],
                    "downvotes": [],
                    "flagged": false,
                    "_id": "5d8b998fd0c6c60008047c8b",
                    "content": "testing order",
                    "parentComment": "5d89864cca3f950007aa63e8",
                    "__v": 0
                }
            ]
        },
        {
            "createdAt": "2019-09-24T02:58:20.498Z",
            "upvotes": [],
            "downvotes": [],
            "flagged": false,
            "_id": "5d8986bcca3f950007aa63ea",
            "content": "Praiyons Reply",
            "parentComment": "5d895971e9adca00082a6bed",
            "__v": 0
        },
        {
            "createdAt": "2019-09-25T16:37:40.469Z",
            "upvotes": [],
            "downvotes": [],
            "flagged": false,
            "_id": "5d8b97d4e4ffef0007782113",
            "content": "uh oh",
            "parentComment": "5d895971e9adca00082a6bed",
            "__v": 0
        }
    ]

    return (
        <div>
            <Row>
                <Col md={24}>
                    <h1>REVIEW TOP PART THINGY HERE</h1>
                </Col>
                <Col md={{ offset: 2, span: 20 }} sm={24}>
                    {
                        props.map(comment => <CommentCard {...comment} />)
                    }
                </Col>
            </Row>
        </div>
    )
}

export default CommentSection