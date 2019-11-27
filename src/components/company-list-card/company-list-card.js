/** @jsx jsx */ import { jsx } from '@emotion/core'
import * as styles from './company-list-card.emotion'
import { Card, Row, Col, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'

const CompanyListCard = (props) => {
    const history = useHistory()

    const handleOnCreateReview = () => {
        history.push(`/company/${props._id}/review/create`)
    }

    return (
        <Card css={styles.CardContainer} bordered={false} bodyStyle={styles.CardBodyStyle}>
            <Row style={{ height: '100%' }}>
                <Link to={`/company/${props.name}/reviews`}>
                    <Col lg={{ span: 4 }} xl={{ span: 3 }} css={styles.CompanyLogoCol}>
                        <div css={styles.CompanyLogoContainer}>
                            <img src={props.logo} style={{ objectFit: 'contain', width: '75%' }} alt="no_logo" />
                        </div>
                    </Col >
                </Link>
                <Col lg={{ span: 20 }} xl={{ span: 21 }} css={styles.CompanyInfoCol}>
                    <div css={styles.CompanyInfoContainer}>
                        <Link to={`/company/${props.name}/reviews`}>
                            <h4 css={styles.CompanyText}>{props.name}</h4>  
                        </Link>
                        <Button onClick={handleOnCreateReview} style={{ position: "absolute", right: "0" }}>Create Review</Button>                      
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default CompanyListCard