import React from 'react'
import MyEditor from '../EditorComponents/MyEditor'
import { Layout } from 'antd'
const { Content } = Layout
export default function CreateContainer(props) {
  return (
    <Layout>

      <Layout style={{ marginLeft: 20, marginTop: '10vh' }}>
        <Content style={{ height: '80vh', margin: '24px 16px 0', overflow: 'initial' }}>

          <div style={{ height: '80vh', padding: 24, background: '#fff', textAlign: 'center', overflow: 'scroll' }}>
            <MyEditor props={props} />
          </div>
        </Content>

      </Layout>
    </Layout>
  )
}
