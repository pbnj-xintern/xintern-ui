
import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import SearchBar from '../search-bar/index'


const { Header, Content, Footer } = Layout;




const Navbar = (props) => {
    
    return (
        <Header style={{ width: '100%' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item style={{ float: 'left' }} key="1">xintern</Menu.Item>
                <SearchBar search={props.search} />
                <Menu.Item style={{ float: 'right' }} key="2">Signup</Menu.Item>
                <Menu.Item style={{ float: 'right' }} key="3">Login</Menu.Item>
            </Menu>
        </Header>

    )
}





export default Navbar