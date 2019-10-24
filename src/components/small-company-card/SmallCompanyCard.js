/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { Row, Col, Card } from 'antd'
import * as styles from './small-company-card.emotion'

const SmallCompanyCard = props => {

    return (
        <Card bordered={false} bodyStyle={styles.BodyStyle} css={styles.Card}>
            <Row>
                <Col md={{ span: 24 }} >
                    <img style={{ marginLeft: 'auto', marginRight: 'auto', maxHeight: '150px' }} src={props.logo}>
                    </img>
                </Col>
            </Row>
            <Row>
                <h1>{props.name}</h1>
                <p>{props.count + ' Reviews'}</p>
            </Row>
        </Card>
    )
}

export default SmallCompanyCard