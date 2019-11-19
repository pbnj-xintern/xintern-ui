import React from 'react'
import { Row, Col } from 'antd'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    let location = useLocation()
    console.log("location pathname:", location.pathname)
    return (
        (location.pathname === "/login" || location.pathname === "/signup") ? null : 
        (<Row style={{ height: "65px" }}>
            <Col style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(21, 97, 173)" }}>
                <h4 style={{ fontWeight: "200", color: "white" }}>© 2019 Copyright. xIntern</h4>
            </Col>
        </Row>)
    )
}

export default Footer