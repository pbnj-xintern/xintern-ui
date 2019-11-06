
import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import SearchBar from '../search-bar/index'


const { Header, Content, Footer } = Layout;

const menuStyle = { position: 'fixed', zIndex: 1, width: '100%' }
const menuItemStyle = { float: 'right' }

const authItems =
    <Menu.Item style={menuItemStyle} key="3">My Profile</Menu.Item>

const unauthItems = [
    <Menu.Item style={menuItemStyle} key="2">Signup</Menu.Item>,
    <Menu.Item style={menuItemStyle} key="3">Login</Menu.Item>
]

const Navbar = (props) => {

    const [isTop, setIsTop] = useState({})
    useEffect(() => {
        window.onscroll = () => {
            window.pageYOffset < 30 ?
                setIsTop(true) :
                setIsTop(false)

        }
    }, [])

    return (
        <Menu
            theme='dark'
            mode="horizontal"
            style={{
                ...menuStyle,
                lineHeight: isTop ? '64px' : '40px',
                backgroundColor: isTop ? '#1561ad' : 'rgba(21, 97, 173,0.6)',
                transition: 'all .1s ease-in-out'
            }}
        >
            <Menu.Item style={{ float: 'left' }} key="1">xintern</Menu.Item>
            <SearchBar search={props.search} />
            {
                props.isAuth ?
                    authItems :
                    unauthItems
            }
        </Menu>

    )
}





export default Navbar