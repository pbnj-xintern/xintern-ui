/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Row, Col, Carousel, List } from 'antd'
import SmallCompanyCard from '../../components/small-company-card/SmallCompanyCard'
import SearchBar from '../../components/search-bar/index'
import * as styles from './homepage.emotion'
import ReviewListCard from '../../components/review-list-card/index'
import axios from 'axios'

const getTopCompanies = async () => {
    try{

    } catch (err) {
        console.error("Could not get recent reviews")
    }
}

const Homepage = () => {
    let [recentReviews, setRecentReviews] = useState([])
    useEffect(() => {
        const getRecentReviews = async () => {
            try{
                let response = await axios.get('https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/review/recent')
                if (response.data.length == 0 || response.data.error) console.error("no recent reviews")
                return response.data
            } catch (err) {
                console.error("Could not get recent reviews", err)
            }
        }
        setRecentReviews(getRecentReviews())
    }, [])

    return (
        <div>
            <div style={{
                backgroundImage: `url('/images/homepage-backdrop.jpeg')`,
                height: '60vh',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.95
                }}>
                <h1 style={{color: 'white', fontSize: "3em", fontWeight: "200"}}>See what other students said about their internships!<SearchBar search={true}/></h1>          
            </div>
            <Row>
                <Col md={{ span: 20, offset: 2 }} sm={{ span: 24 }}>
                    <h1 style={{ fontWeight: "500", marginTop: '7%' }}>Check out these Top Companies!</h1>
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
            <Row style={{ padding: "0em 17em" }}>
                <Col xs={{ span: 24 }} style={{ width: "100%" }}>
                    <h1 style={{ fontWeight: "500", marginTop: '7%' }}>Recent Reviews</h1>
                    <List
                        split={false}
                        size="large"
                        dataSource={ recentReviews.map((review) => <ReviewListCard {...review} />) }
                        renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Homepage