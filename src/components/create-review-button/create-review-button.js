/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { Button, Icon, Tooltip } from 'antd'
import * as styles from './create-review-button.emotion'
import { useLocation, useHistory } from 'react-router-dom'

const CreateReviewButton = () => {
    const location = useLocation()
    let history = useHistory()
    let path = location.pathname
    console.log('current path:', path)

    const handleOnClick = () => {
        history.push("/review/create")
    }

    return (
        (path.includes("/review/create")) ? null : 
        <Tooltip trigger="hover" title="Create a Review!">
            <Button shape="circle" size="large" css={styles.ButtonStyles} onClick={handleOnClick}>
                <Icon type="plus" css={styles.IconStyles} />
            </Button>
        </Tooltip>
    )
}

export default CreateReviewButton