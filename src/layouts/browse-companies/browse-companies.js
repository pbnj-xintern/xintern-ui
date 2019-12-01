import { Col, Icon, Input, List, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CompanyListCard from '../../components/company-list-card/company-list-card';
const { Search } = Input;


const getAllCompanies = async () => {
    try {
        let response = await axios.get('/company/all')
        if (response.data.length === 0 || response.data.error) {
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
    let [filteredCompanies, setFilteredCompanies] = useState([])
    let [typingTimer, setTypingTimer] = useState(null)

    useEffect(() => {
        setLoading(true)
        const fetchAllCompanies = async () => {
            let allCompanies = await getAllCompanies()
            setAllCompanies(allCompanies)
            setFilteredCompanies(allCompanies)
            setLoading(false)
        }
        fetchAllCompanies()
    }, [])

    const onSearch = valueFromSearchBar => {
        clearTimeout(typingTimer);
        let filterTerm = valueFromSearchBar.replace(/[\W_]+/g, '').toLowerCase()

        setFilteredCompanies(
            allCompanies.filter(c => c.name.replace(/[\W_]+/g, '').toLowerCase().includes(filterTerm))
        )
    }

    const onInputChange = e => {
        clearTimeout(typingTimer);
        let filterTerm = e.target.value.replace(/[\W_]+/g, '').toLowerCase()

        setTypingTimer(setTimeout(() => {
            setFilteredCompanies(
                allCompanies.filter(c => c.name.replace(/[\W_]+/g, '').toLowerCase().includes(filterTerm))
            )
        }, 500));
    }

    const headerStyle = { fontWeight: "500" }

    const jumpToId = letter => {
        let ele = document.getElementsByClassName('letter-' + letter.toLowerCase())
        if (ele.length > 0) {
            ele[0].scrollIntoView()
        }
    }

    const getSidebarButtons = () => {
        let buttonList = [
            <li
                // id='rolodex'
                // onClick={() => window.scrollTo({ top: 0 })}
                // style={{
                //     cursor: 'default',
                //     transition: 'all .2s ease-in-out'
                // }}
                style={{ marginBottom: "12%", marginTop: "18%" }}
            >
                <b>Jump To:</b>
            </li>,
            <li
                id='rolodex'
                // onClick={() => jumpToId('#')}
                onClick={() => window.scrollTo({ top: 0 })}
                style={{
                    cursor: 'pointer',
                    transition: 'all .2s ease-in-out'
                }}
            >
                #
            </li>
        ];
        for (var i = 0; i < 26; i++) {
            let letter = String.fromCharCode(65 + i)
            buttonList.push(<li
                id='rolodex'
                onClick={() => jumpToId(letter)}
                style={{
                    cursor: 'pointer',
                    transition: 'all .2s ease-in-out'
                }}
            >
                {letter}
            </li>)
        }
        return buttonList
    }

    return (
        <div style={{ minHeight: "100vh", background: "#F5FcFF" }}>
            <Row>
                <Col md={23}>
                    <Row style={{ paddingTop: '7%' }} >
                        {
                            isLoading ?
                                <h1 style={headerStyle}>Fetching Companies <Icon type='loading' /></h1> :
                                <h1 style={headerStyle}>Browse Companies</h1>
                        }
                        <Search
                            size='large'
                            id='home-search'
                            placeholder="Filter company by name"
                            onSearch={onSearch}
                            onChange={onInputChange}
                            style={{ width: '50%', marginTop: '1em' }}
                        />
                    </Row>
                    <Row style={{ paddingTop: '1%' }} >
                        <Col md={{ span: 16, offset: 4 }} xs={{ span: 24 }} style={{ paddingBottom: "4%" }}>
                            {filteredCompanies ?
                                <List
                                    split={false}
                                    size="large"
                                    dataSource={filteredCompanies.map((company) => {
                                        let char = company.name.toLowerCase().charAt(0)
                                        return {
                                            cname: isNaN(char) ? 'letter-' + char : 'letter-#',
                                            domElement: <CompanyListCard {...company} />
                                        }
                                    })}
                                    renderItem={item => <List.Item className={item.cname} style={{ padding: "0 !important" }}>{item.domElement}</List.Item>}
                                /> :
                                <h2>{!isLoading && "No Companies Found"} </h2>
                            }
                        </Col>
                        <Col md={1} style={{
                            position: 'sticky',
                            width: '60px',
                            top: '10%',
                            right: '0',
                            zIndex: '100'
                        }}>
                            {!isLoading &&
                                <ul style={{
                                    listStyleType: 'none',
                                    fontWeight: '15px',
                                    width: "max-content"
                                }}>
                                    {getSidebarButtons()}
                                </ul>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default BrowseCompanies