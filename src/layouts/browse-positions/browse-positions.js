/** @jsx jsx */ import { jsx } from '@emotion/core';
import { Card, Col, Icon, Input, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './browse-positions.emotion';
const { Search } = Input;


const BrowsePositions = () => {
    let [allPositions, setAllPositions] = useState([])
    let [isLoading, setLoading] = useState([])
    let [filteredPositions, setFilteredPositions] = useState([])
    let [typingTimer, setTypingTimer] = useState(null)

    useEffect(() => {
        window.scrollTo({ top: 0 })
        setLoading(true)
        const fetchAllPositions = async () => {
            let response = await axios.get('/review/positions')
            if (response.data.length === 0 || response.data.error) {
                console.error("no companies")
            }
            setAllPositions(response.data)
            setFilteredPositions(response.data)
            setLoading(false)
        }
        fetchAllPositions()
    }, [])

    const onSearch = valueFromSearchBar => {
        clearTimeout(typingTimer);
        let filterTerm = valueFromSearchBar.replace(/[\W_]+/g, '').toLowerCase()

        setFilteredPositions(
            allPositions.filter(c => c.positionName.replace(/[\W_]+/g, '').toLowerCase().includes(filterTerm))
        )
    }

    const onInputChange = e => {
        clearTimeout(typingTimer);
        let filterTerm = e.target.value.replace(/[\W_]+/g, '').toLowerCase()

        setTypingTimer(setTimeout(() => {
            setFilteredPositions(
                allPositions.filter(c => c.positionName.replace(/[\W_]+/g, '').toLowerCase().includes(filterTerm))
            )
        }, 500));
    }

    const headerStyle = { fontWeight: "500" }

    return (
        <div style={{ minHeight: "100vh", background: "#F5FcFF" }}>
            <Row style={{ paddingTop: '7em', paddingBottom: '2%' }} >
                {
                    isLoading ?
                        <h1 style={headerStyle}>Fetching Positions <Icon type='loading' /></h1> :
                        <h1 style={headerStyle}>Browse Positions</h1>
                }
                <Search
                    size='large'
                    id='home-search'
                    placeholder="Filter position by name"
                    onSearch={onSearch}
                    onChange={onInputChange}
                    style={{ width: '50%', marginTop: '1em' }}
                />
            </Row>
            <Row style={{ paddingTop: '1%' }} >
                {filteredPositions ?
                    filteredPositions.map(pos =>
                        <Col style={{ padding: '10px' }} md={4} sm={12}>
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
                    <h2>{isLoading && "Loading positions"} </h2>
                }
            </Row>
        </div>
    )
}

export default BrowsePositions