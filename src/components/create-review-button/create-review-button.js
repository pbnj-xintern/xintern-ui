/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { Button, Icon, Tooltip } from 'antd'
import * as styles from './create-review-button.emotion'
import { useLocation, useHistory } from 'react-router-dom'
import { useAuthState } from '../../state/auth-state'

const CreateReviewButton = () => {
    const location = useLocation()
    const [authState, changeAuthState] = useAuthState();
    let history = useHistory()
    let path = location.pathname
    console.log('current path:', path)

    const handleOnClick = () => {
        history.push("/review/create")
    }

    const toolTipMessage = authState.isAuth ? "Create a Review!" : "Login to Create a Review!"

    return (
        (path.includes("/review/create") || path.includes("login") || path.includes("signup")) ? null : 
        <Tooltip trigger="hover" title={toolTipMessage}>
            <Button shape="circle" size="large" css={styles.ButtonStyles} onClick={(!authState.isAuth) ? null : handleOnClick}>
                <Icon type="plus" css={styles.IconStyles} />
            </Button>
        </Tooltip>
    )
}

export default CreateReviewButton