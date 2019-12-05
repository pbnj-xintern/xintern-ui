/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Carousel, Col, List, Row, Input } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ReviewListCard from '../../components/review-list-card/review-list-card'
import SmallCompanyCard from '../../components/small-company-card/small-company-card'
import * as styles from './homepage.emotion'
const { Search } = Input
const getTopCompanies = async () => {
    try {
        let res = await axios.get('/company/top')
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
        return formattedData
    } catch (err) {
        console.error("Could not get recent reviews")
    }
}

const getRecentReviews = async () => {
    try {
        let response = await axios.get('/review/recent')
        if (response.data.length === 0 || response.data.error) {
            console.error("no recent reviews")
            return []
        }
        return response.data
    } catch (err) {
        console.error("Could not get recent reviews", err.message)
    }
}

const Homepage = () => {
    let [recentReviews, setRecentReviews] = useState([])
    let [topCompanies, setTopCompanies] = useState([])
    let [toSearchRes, setToSearchRes] = useState(false)
    let [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        window.scrollTo({ top: 0 })
        async function fetchRecentReviews() {
            setRecentReviews(await getRecentReviews())
        }
        async function fetchTopCompanies() {
            setTopCompanies(await getTopCompanies())
        }
        fetchTopCompanies()
        fetchRecentReviews()
    }, [])


    const onSearch = userInput => {
        setSearchTerm(userInput)
        setToSearchRes(true)
    }

    var isTopCompaniesEmpty = topCompanies === [] || topCompanies === undefined;

    return toSearchRes ?
        <Redirect to={{
            pathname: `/search/${searchTerm}`
        }} /> : (
            <div>
                <div style={{
                    backgroundImage: `url('/images/homepage-backdrop.jpeg')`,
                    height: '70vh',
                    backgroundSize: 'cover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.98
                }}>
                    <h1 style={{ color: 'white', fontSize: "3em", fontWeight: "200" }}>See what other students said about their internships!<br></br>
                        <Search
                            size='large'
                            id='home-search'
                            placeholder="Search for a company or position"
                            onSearch={onSearch}
                            style={{ width: '60%', marginTop: '1em' }}
                        />
                    </h1>
                </div>
                {!isTopCompaniesEmpty &&
                    <Row css={styles.outerCarouselDiv} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                        <Col xl={{ span: 20, offset: 2 }} md={24}>
                            <h1 style={{ fontWeight: "500", paddingBottom: "3%" }}>Check out these Top Companies!</h1>
                            <Carousel autoplay>
                                {
                                    topCompanies.map((div, i) =>
                                        <div key={i} css={styles.CarouselDiv}>
                                            <Row style={{ paddingBottom: '2em' }} type="flex" justify="space-around" align="middle">
                                                {
                                                    div.map((company, i) =>
                                                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={i} 
                                                        md={4} xs={12}>
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
                <Row style={{ backgroundColor: 'white' }}>
                    <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }} style={{ paddingBottom: "4%" }}>
                        <h1 style={{ fontWeight: "500", marginTop: '5%' }}>Recent Reviews</h1>
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