/** @jsx jsx */ import { jsx, css } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import * as styles from './company-list-card.emotion'
import { Card, Row, Col } from 'antd'

const CompanyListCard = (props) => {
    return (
        <Card css={styles.CardContainer} bordered={false} bodyStyle={styles.CardBodyStyle}>
            <Row style={{ height: '100%' }}>
                <Col lg={{ span: 4 }} xl={{ span: 3 }} css={styles.CompanyLogoCol}>
                    <div css={styles.CompanyLogoContainer}>
                        <img src={props.logo} style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                    </div>
                </Col >
                <Col lg={{ span: 20 }} xl={{ span: 11 }} css={styles.CompanyInfoCol}>
                    <div css={styles.CompanyInfoContainer}>
                        <h4 css={styles.CompanyText} style={{ color: "darkblue" }}>{props.name}</h4>                        
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default CompanyListCard