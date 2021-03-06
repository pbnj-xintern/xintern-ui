/** @jsx jsx */ import { jsx } from '@emotion/core'
import * as styles from './company-list-card.emotion'
import { Card, Row, Col, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'

const CompanyListCard = (props) => {
    const history = useHistory()

    const handleOnCreateReview = () => {
        history.push(`/company/${props.name}/review/create`)
    }

    return (
        <Card css={styles.CardContainer} bodyStyle={styles.CardBodyStyle}>
            <Row style>
                <Link to={`/company/${props.name}/reviews`}>
                    <Col xs={10} sm={3}>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                            <img src={props.logo} style={{ objectFit: 'cover', maxWidth: '70px', maxHeight: '70px', width: 'auto' }} alt="no_logo" />
                        </div>
                    </Col >
                </Link>
                <Col style={{ height: '100px', weight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} xs={14} sm={21}>
                    <Row style={{ width: '100%' }}>
                        <Col sm={20} xs={24} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <Link to={`/company/${props.name}/reviews`}>
                                <h2 css={styles.CompanyText}>{props.name}</h2>
                            </Link>
                        </Col>
                        <Col sm={4} xs={24} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <Button block style={{
                                height: '100%',
                                overflow: 'hidden',
                                wordWrap: 'break-word',
                                whiteSpace: 'normal'
                            }} onClick={handleOnCreateReview}>
                                Create Review
                            </Button>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card >
    )
}

export default CompanyListCard