import React, { useState, useEffect } from 'react'
import { Row, Col, List, Icon } from 'antd'
import axios from 'axios'
import CompanyListCard from '../../components/company-list-card/company-list-card'

const getAllCompanies = async () => {
    try {
        let response = await axios.get('https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/dev/company/all')
        if (response.data.length == 0 || response.data.error) {
            console.error("no companies")
            return []
        }
        return response.data
    } catch (err) {
        console.error("Could not get all companies")
    }
}

const BrowseCompanies = () => {
    let [allCompanies, setAllCompanies] = useState([])
    let [isLoading, setLoading] = useState([])

    useEffect(() => {
        setLoading(true)
        const fetchAllCompanies = async () => {
            setAllCompanies(await getAllCompanies())
            setLoading(false)
        }
        fetchAllCompanies()
    }, [])

    const headerStyle = { fontWeight: "500", marginTop: '13%' }

    return (
        <Row>
            <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                {isLoading ? <h1 style={headerStyle}>Fetching Companies <Icon type='loading'/></h1>: <h1 style={headerStyle}>Browse Companies</h1>}
                {allCompanies ?
                    <List
                        split={false}
                        size="large"
                        dataSource={allCompanies.map((company) => <CompanyListCard {...company} />)}
                        renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                    /> :
                    <h2>{!isLoading && "No Companies Found"} </h2>
                }
            </Col>
        </Row>
    )
}

export default BrowseCompanies