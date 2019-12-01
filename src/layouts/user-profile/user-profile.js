/** @jsx jsx */ import { jsx } from '@emotion/core'
import * as styles from './user-profile.emotion'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import ProfileComment from '../../components/profile-comment/profile-comment';
import ProfileReview from '../../components/profile-review/profile-review'
const { TabPane } = Tabs;


const Userprofile = props => {

    return (

        <div css={styles.Tabs}>

            <Tabs >
                <TabPane tab="Comments" key="1">
                    <ProfileComment />
            </TabPane>
                <TabPane tab="Reviews" key="2">
                    <ProfileReview />
             </TabPane>
            </Tabs>
        </div>
    )
}

export default Userprofile