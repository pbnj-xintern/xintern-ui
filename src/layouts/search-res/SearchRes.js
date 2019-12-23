/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Col, Card, Row, List, Button, Icon, Empty } from 'antd'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as styles from './search-res.emotion'
import CompanyListCard from '../../components/company-list-card/company-list-card';


const SearchRes = () => {
    const [positionResults, setPositionResults] = useState([])
    const [companyResults, setCompanyResults] = useState([])
    const [positionLoading, setPositionLoading] = useState(false)
    const [companyLoading, setCompanyLoading] = useState(false)
    const location = useLocation()
    let searchTerm = location.pathname.split("search/")[1]
    useEffect(() => {
        const positionsGet = async () => {
            let positionResponse = await Axios.get(`/review/positions/${encodeURIComponent(searchTerm)}`)
                .catch(e => {
                    console.error(e)
                    return false;
                })

            if (!positionResponse)
                setPositionResults([])
            else {
                setPositionResults(positionResponse.data)
            }
        }
        const companiesGet = async () => {
            let companyResponse = await Axios.get(`/company//grouped/${encodeURIComponent(searchTerm)}`)
                .catch(e => {
                    console.error(e)
                    return false;
                })

            if (!companyResponse)
                setCompanyResults([])
            else {
                console.log(companyResponse)
                setCompanyResults(companyResponse.data)
            }
        }

        companiesGet()
        positionsGet()
    }, [])

    return (
        <div style={{ backgroundColor: '#f2f2f2', paddingTop: '7em', paddingBottom: '5%', minHeight: '95vh' }}>
            <h1>Search Results for "{searchTerm}"</h1>
            <Row>
                <Col md={12} style={{ padding: '0.5em' }}>
                    <Card>
                        <Row>
                            <h2>Companies</h2>
                            <Link to='/companies'><Button>Click here to see more companies</Button></Link>
                        </Row>

                        {companyResults ?
                            <List
                                split={false}
                                size="large"
                                dataSource={companyResults.map((company) =>
                                    <CompanyListCard {...company} />
                                )}
                                renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                            /> :
                            <Icon type='loading' />
                        }
                    </Card>
                </Col>
                <Col md={12} style={{ padding: '0.5em' }}>
                    <Card>
                        <Row>
                            <h2>Positions</h2>
                            <Link to='/all-positions'><Button>Click here to see more positions</Button></Link>
                        </Row>
                        {positionResults !==[] ?
                            positionResults.map(pos =>
                                <Col style={{ padding: '10px' }} md={8} sm={12}>
                                    <Link to={`/positions/${pos.positionName}`}>
                                        <Card css={styles.PositionCard}>
                                            <div style={{ whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <b>{pos.positionName}</b>
                                            </div>
                                            <br />
                                            {pos.numReviews + ' Reviews'}
                                        </Card>
                                    </Link>
                                </Col>) :
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SearchRes