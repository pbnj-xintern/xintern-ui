/** @jsx jsx */ import { jsx } from '@emotion/core'
import * as styles from './user-profile.emotion'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
const { TabPane } = Tabs;

const Userprofile = props => {

    return (
        
        <div css={styles.Tabs}>
        
        <Tabs >
    <TabPane tab="Comments" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Reviews" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
        </div>
    )
}

export default Userprofile