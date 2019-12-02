/** @jsx jsx */ import { jsx } from '@emotion/core';
import { Tabs, Icon } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileComment from '../../components/profile-comment/profile-comment';
import ProfileReview from '../../components/profile-review/profile-review';
import * as styles from './user-profile.emotion';
import UserCard from '../../components/user-card/user-card'
const { TabPane } = Tabs;


const Userprofile = props => {

    console.log('props received', props)

    let [username, setUsername] = useState('')
    let loc = useLocation()

    useEffect(() => {
        setUsername(loc.pathname.split('profile/')[1])
    }, [props.location])

    return (

        <div css={styles.Tabs}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span>
                    <Icon type="user" />
                    {username}
                </span>} key="1">

                {username &&
                        <UserCard username={username} />
                    }
                </TabPane>
                <TabPane tab="Comments" key="2">
                    {username &&
                        <ProfileComment username={username} />
                    }
                </TabPane>
                <TabPane tab="Reviews" key="3">
                    {username &&
                        <ProfileReview username={username} />
                    }
                </TabPane>


            </Tabs>
        </div>
    )
}

export default Userprofile