
import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'antd';
import SearchBar from '../search-bar/index'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuthState } from '../../state/auth-state'
import colors from '../../globals/colors'

const menuStyle = { position: 'fixed', zIndex: 1, width: '100%' }
const menuItemStyle = { float: 'right' }

const Navbar = (props) => {

    // HOOKS
    const [authState, changeAuthState] = useAuthState();
    const [username, setUsername] = useState("")
    const [isTop, setIsTop] = useState({})
    useEffect(() => {
        setUsername(localStorage.getItem('username'))
        window.onscroll = () => {
            window.pageYOffset < 30 ?
                setIsTop(true) :
                setIsTop(false)
        }
    }, [authState.isAuth])

    //FUNCTIONS
    const logout = () => {
        localStorage.clear()
        toast.info('Successfully logged out')
        changeAuthState({ type: "CHANGE_AUTH_STATE", isAuth: false })
    }


    const authItems = [
        <Menu.Item onClick={logout} style={menuItemStyle} key="2">
            <Link to={`/`}><Icon type='logout' />Logout</Link>
        </Menu.Item>,
        <Menu.Item style={menuItemStyle} key="3">
            <Link to={{
                pathname: `/profile/${username}`
            }} ><Icon type='user' />My Profile</Link>
        </Menu.Item>
    ]

    const unauthItems = [
        <Menu.Item style={menuItemStyle} key="2">
            <Link to={`/signup`}><Icon type="user-add" />Signup</Link>
        </Menu.Item>
        ,
        <Menu.Item style={menuItemStyle} key="3">
            <Link to={`/login`}><Icon type='login' />Login</Link>
        </Menu.Item>

    ]

    return (
        <Menu
            theme='dark'
            mode="horizontal"
            style={{
                ...menuStyle,
                lineHeight: isTop ? '64px' : '40px',
                backgroundColor: isTop ? colors.primary : 'rgba(0,0,0,0.6)',
                transition: 'all .1s ease-in-out',
                boxShadow: isTop ? 'none' : '10px 10px 31px -17px rgba(0,0,0,0.7)'
            }}
        >
            <Menu.Item style={{ float: 'left' }} key="1">
                <Link to={`/`}><b style={{ fontWeight: 'bolder', fontSize: '18px' }}>xintern.co</b></Link>
            </Menu.Item>
            <Menu.Item style={{ float: 'left' }} key="4">
                <Link to={`/companies`}>Companies</Link>
            </Menu.Item>
            <Menu.Item style={{ float: 'left' }} key="5">
                <Link to={`/all-positions`}>Positions</Link>
            </Menu.Item>
            <Menu.Item  disabled style={{ float: 'left' }} key="6">
                <Link to={`/all-location`}>Locations</Link>
            </Menu.Item>

            <SearchBar search={props.search} />
            {
                authState.isAuth ?
                    authItems :
                    unauthItems
            }
        </Menu >
    )
}


export default Navbar