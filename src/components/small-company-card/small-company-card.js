/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import * as styles from './small-company-card.emotion'

const SmallCompanyCard = props => {

    return (
        <Card bordered={false} bodyStyle={styles.BodyStyle} css={styles.Card}>
            <Link to={`/company/${props.name}/reviews`}>
                <Row>
                    <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div css={styles.ImageContainer}>
                            <img css={styles.LogoImage} src={props.logo} alt={"https://dummyimage.com/300x300/CFC/fff.png&text=" + props.name.substring(0, 1)} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <h1>{props.name}</h1>
                    <p>{props.count + ' Reviews'}</p>
                </Row>
            </Link>
        </Card>
    )
}

export default SmallCompanyCard