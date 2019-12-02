
import React/*, { useState }*/ from 'react'

import { Input } from 'antd';
const { Search } = Input;

const SearchBar = props => {

    const onSearch = searchTerms => {
        console.log(props)
    }

    return (
        props.search &&
        <Search
            size='large'
            id='home-search'
            placeholder="Search for a company or position"
            onSearch={onSearch}
            style={{ width: '50%', marginTop: '1em' }}
        />

    )

}

export default SearchBar