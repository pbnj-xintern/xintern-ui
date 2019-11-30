/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Col, List, Row } from 'antd'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReviewListCard from '../../components/review-list-card/review-list-card'


const SearchRes = () => {
    const [positionResults, setPositionResults] = useState([])
    const location = useLocation()
    let searchTerm = location.pathname.split("term=")[1]
    useEffect(() => {
        console.log('searchTerm', searchTerm)
    }, [])

    return (
        <div stlye={{marginTop: '10%'}}>
            {searchTerm}
        </div>
    )
}

export default SearchRes