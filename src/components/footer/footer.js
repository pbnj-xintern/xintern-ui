/** @jsx jsx */ import { jsx } from '@emotion/core'
import React from 'react'
import { Row, Col } from 'antd'
import * as styles from './footer.emotion'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    let location = useLocation()
    return (
        (location.pathname === "/login" || location.pathname === "/signup") ? null : 
        (<Row style={{ height: "65px" }}>
            <Col css={styles.FooterCol}>
                <h4 style={{ fontWeight: "200", color: "white", marginBottom: "0" }}>© 2019 Copyright. xIntern</h4>
            </Col>
        </Row>)
    )
}

export default Footer