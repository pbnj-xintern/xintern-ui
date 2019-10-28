
import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import SearchBar from '../search-bar/index'
import { NavLink } from 'react-router-dom'


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
                <Menu.Item style={{ float: 'left', backgroundColor: "none" }} key="1"><NavLink to="/">xIntern</NavLink></Menu.Item>
                <Menu.Item style={{ float: 'left' }} key="2"><NavLink to="/companies">Companies</NavLink></Menu.Item>
                <SearchBar search={props.search} />
                <Menu.Item style={{ float: 'right' }} key="3">Signup</Menu.Item>
                <Menu.Item style={{ float: 'right' }} key="4">Login</Menu.Item>
            </Menu>
        </Header>

    )
}





export default Navbar