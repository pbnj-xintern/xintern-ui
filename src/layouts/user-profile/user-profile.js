/** @jsx jsx */ import { jsx } from '@emotion/core';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileComment from '../../components/profile-comment/profile-comment';
import ProfileReview from '../../components/profile-review/profile-review';
import * as styles from './user-profile.emotion';
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
            <Tabs >
                <TabPane tab="Comments" key="1">
                    {username &&
                        <ProfileComment username={username} />
                    }
                </TabPane>
                <TabPane tab="Reviews" key="2">
                    {username &&
                        <ProfileReview username={username} />
                    }
                </TabPane>

                <TabPane tab={username} key="3">

                </TabPane>
            </Tabs>
        </div>
    )
}

export default Userprofile