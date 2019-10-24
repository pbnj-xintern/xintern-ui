/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { Row, Col, Card } from 'antd'
import * as styles from './small-company-card.emotion'

const SmallCompanyCard = () => {

    return (
        <Card bordered={false} bodyStyle={styles.BodyStyle} css={styles.Card}>
            <Row>
                <Col md={{ span: 24 }} >
                    <img style={{ marginLeft: 'auto', marginRight: 'auto', maxHeight: '150px' }} src='data:image/png;base64,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'>
                    </img>
                </Col>
            </Row>
            <Row>
                <h1>Amazon</h1>
                <p>3123 Reviews</p>
            </Row>
        </Card>
    )
}

export default SmallCompanyCard