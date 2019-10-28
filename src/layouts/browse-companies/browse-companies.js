import React, { useState, useEffect } from 'react'
import { Row, Col, List } from 'antd'

const BrowseCompanies = () => {
    let [allCompanies, setAllCompanies] = useState([])

    return (
        <Row>
            <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }}>
                <h1 style={{ fontWeight: "500", marginTop: '7%' }}>Browse Companies</h1>
                {allCompanies ?
                    <List
                        split={false}
                        size="large"
                        dataSource={allCompanies.map((company) => <ReviewListCard {...company} />)}
                        renderItem={item => <List.Item style={{ padding: "0 !important" }}>{item}</List.Item>}
                    /> :
                    <h2>No Companies Found</h2>
                }
            </Col>
        </Row>      
    )
}

export default BrowseCompanies