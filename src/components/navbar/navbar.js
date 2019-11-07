
import React, { useState, useEffect, useContext } from 'react'
import { Menu, Icon } from 'antd';
import SearchBar from '../search-bar/index'
import { Redirect, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuthState } from '../../state/auth-state'

const menuStyle = { position: 'fixed', zIndex: 1, width: '100%' }
const menuItemStyle = { float: 'right' }

const Navbar = (props) => {

    // HOOKS
    const [authState, changeAuthState] = useAuthState();
    
    const [isTop, setIsTop] = useState({})
    useEffect(() => {
        window.onscroll = () => {
            window.pageYOffset < 30 ?
                setIsTop(true) :
                setIsTop(false)
        }
    }, [])

    //FUNCTIONS
    const logout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.clear()
            toast.info('Successfully logged out')
            changeAuthState({ type: "CHANGE_AUTH_STATE", isAuth: false })
        }
    }


    const authItems = [
        <Menu.Item onClick={logout} style={menuItemStyle} key="2"><Icon type='logout' />Logout</Menu.Item>,
        <Menu.Item style={menuItemStyle} key="3">
            <Link to={`/me`}><Icon type='user' />My Profile</Link>
        </Menu.Item>
    ]

    const unauthItems = [

        <Menu.Item style={menuItemStyle} key="2">
            <Link to={`/signup`}>Signup</Link>
        </Menu.Item>
        ,
        <Menu.Item style={menuItemStyle} key="3">
            <Link to={`/login`}><Icon type='login' />Login</Link>
        </Menu.Item>

    ]

    console.log('authstate', authState)

    return (
        <Menu
            theme='dark'
            mode="horizontal"
            style={{
                ...menuStyle,
                lineHeight: isTop ? '64px' : '40px',
                backgroundColor: isTop ? '#1561ad' : 'rgba(0,0,0,0.6)',
                transition: 'all .1s ease-in-out'
            }}
        >
            <Menu.Item style={{ float: 'left' }} key="1">
                <Link to={`/`}>xIntern</Link>
            </Menu.Item>
            <Menu.Item style={{ float: 'left' }} key="4">
                <Link to={`/companies`}><Icon />Companies</Link>
            </Menu.Item>

            <SearchBar search={props.search} />
            {
                authState.isAuth ?
                    authItems :
                    unauthItems
            }
        </Menu>


    )
}


export default Navbar