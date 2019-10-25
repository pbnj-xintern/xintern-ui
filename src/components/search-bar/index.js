
import React, { useState } from 'react'

import { Input } from 'antd';
const { Search } = Input;


const SearchBar = props => {
    return (
        props.search ?
            <Search
                placeholder="input search text"
                enterButton="Search"
                onSearch={value => console.log(value)}
                style={{ width: '50%', marginTop: '1em' }}
            /> : null

    )

}

export default SearchBar