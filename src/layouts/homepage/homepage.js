/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Row, Col, Carousel, List } from 'antd'
import SmallCompanyCard from '../../components/small-company-card/SmallCompanyCard'
import SearchBar from '../../components/search-bar/index'
import * as styles from './homepage.emotion'
import ReviewListCard from '../../components/review-list-card/index'
import axios from 'axios'

const getTopCompanies = async () => {
    try {
        let res = await axios.get('https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/topCompanies')
        if (res.status === 500) {
            console.error('Could not get top companies')
            return []
        }
        const cardsInDiv = 4
        const formattedData = []
        res.data.forEach((company, i) => {
            if (i % cardsInDiv === 0)
                formattedData.push([])
            formattedData[formattedData.length - 1].push(company)
        })
        console.log('formattedData', formattedData)
        return formattedData
    } catch (err) {
        console.error("Could not get recent reviews")
    }
}

const getRecentReviews = async () => {
    try {
        let response = await axios.get('https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/review/recent')
        if (response.data.length == 0 || response.data.error) {
            console.error("no recent reviews")
            return []
        }
        return response.data
    } catch (err) {
        console.error("Could not get recent reviews", err)
    }
}

const Homepage = () => {
    let [recentReviews, setRecentReviews] = useState([])
    let [topCompanies, setTopCompanies] = useState([])

    useEffect(() => {
        async function fetchRecentReviews() {
            setRecentReviews(await getRecentReviews())
        }
        async function fetchTopCompanies() {
            setTopCompanies(await getTopCompanies())
        }
        fetchTopCompanies()
        fetchRecentReviews()
    }, [])

    var isTopCompaniesEmpty = topCompanies === [] || topCompanies === undefined;

    console.log('topcom', topCompanies)

    return (
        <div>
            <div style={{
                backgroundImage: `url('/images/homepage-backdrop.jpeg')`,
                height: '70vh',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.95
            }}>
                <h1 style={{ color: 'white', fontSize: "3em", fontWeight: "200" }}>See what other students said about their internships!<SearchBar search={true} /></h1>
            </div>
            {!isTopCompaniesEmpty &&
                <Row>
                    <Col xl={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }} sm={{ span: 24 }}>
                        <h1 style={{ fontWeight: "500", marginTop: '7%' }}>Check out these Top Companies!</h1>
                        <Carousel autoplay>
                            {
                                topCompanies.map((div, i) =>
                                    <div key={i} css={styles.CarouselDiv}>
                                        <Row type="flex" justify="space-around" align="middle">
                                            {
                                                div.map((company, i) =>
                                                    <Col key={i} md={4} sm={24}>
                                                        <SmallCompanyCard {...company} />
                                                    </Col>
                                                )
                                            }
                                        </Row>
                                    </div>
                                )
                            }
                        </Carousel>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                    <h1 style={{ fontWeight: "500", marginTop: '7%' }}>Recent Reviews</h1>
                    {recentReviews ?
                        <List
                            split={false}
                            size="large"
                            dataSource={recentReviews.map((review) => <ReviewListCard {...review} />)}
                            renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                        /> :
                        <h2>No reviews</h2>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Homepage