/** @jsx jsx */ import { jsx } from '@emotion/core'
// import React, { useState } from 'react'
import { Row, Col, Carousel, List } from 'antd'
import SmallCompanyCard from '../../components/small-company-card/SmallCompanyCard'
import SearchBar from '../../components/search-bar/index'
import * as styles from './homepage.emotion'
import ReviewListCard from '../../components/review-list-card/index'

const Homepage = () => {

    const reviewCards = [
        <ReviewListCard />,
        <ReviewListCard />,
        <ReviewListCard />
    ]

    return (
        <div>
            <div style={{
                backgroundImage: `url('/images/homepage-backdrop.jpeg')`,
                height: '60vh',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h1 style={{color: 'white'}}>See what other students said about their internships!<SearchBar search={true}/></h1>
                
            </div>
            <Row>
                <Col md={{ span: 20, offset: 2 }} sm={{ span: 24 }}>
                    <h1>Check these companies out!</h1>
                    <Carousel>
                        <div css={styles.CarouselDiv}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4}>
                                    <SmallCompanyCard />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                                <Col md={4} sm={24}>
                                    <SmallCompanyCard />
                                </Col>
                            </Row>
                        </div>
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                    <h1>Recent reviews</h1>
                    <List
                        size="large"
                        dataSource={reviewCards}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Col>
            </Row>
        </div>

    )
}

export default Homepage