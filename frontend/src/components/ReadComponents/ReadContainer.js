import React, { useState, useEffect } from 'react'
import ReadEditor from './ReadEditor'
import Authservice from '../../services/auth'
import { Layout, Avatar } from 'antd'
import CommentSection from './CommentSection'
const { Content, Sider } = Layout
export default function ReadContainer(props) {
  const { match } = props
  const [post, setpost] = useState({})

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          backgroundColor: '#d1582b',
          color: '#D4dfc2',
          padding: '15px',
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {post.postedBy !== undefined ? <Avatar size={80} src={post.postedBy.profilePic} /> : ''}
        {post.postedBy !== undefined ? <h2>{post.postedBy.username}</h2> : ''}
      </Sider>
      <Layout style={{ marginLeft: 200, marginTop: '10vh' }}>
        <Content style={{ height: '100vh', margin: '24px 16px 0', overflow: 'initial' }}>
          <h1>{post.title}</h1>
          <div style={{ height: '80vh', padding: 24, background: '#fff', textAlign: 'center', overflow: 'scroll' }}>
            <ReadEditor post={post} setpost={setpost} match={match} />
          </div>
        </Content>
        <CommentSection post={post} />
      </Layout>
    </Layout>
  )
}
