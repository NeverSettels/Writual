import React, { useState, useContext } from 'react'
import ReadEditor from './ReadEditor'
import { MyContext } from '../../context'

import { Layout, Avatar, Button, Tag } from 'antd'
import CommentSection from './CommentSection'
const { Content, Sider } = Layout
export default function ReadContainer(props) {
  const context = useContext(MyContext)
  const { match } = props
  const [post, setpost] = useState({})
  const [edit, setEdit] = useState(false)

  function canEdit() {
    setEdit(true)
  }
  function cancel() {
    setEdit(false)
  }

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
        <div>
          {post.categories !== undefined ? post.categories.map(category => (
            <Tag>{category}</Tag>
          )) : ""}
        </div>
        {post.postedBy !== undefined ? context.state.user._id === post.postedBy._id && !edit ? <Button onClick={canEdit}>edit</Button> : '' : ''}
        {edit ? <div><button onClick={cancel}>Cancel</button></div> : ''}
      </Sider>
      <Layout style={{ marginLeft: 200, marginTop: '10vh' }}>
        <Content style={{ height: '100vh', margin: '24px 16px 0', overflow: 'initial' }}>
          <h1>{post.title}</h1>
          <div style={{ height: '80vh', padding: 24, background: '#fff', textAlign: 'center', overflow: 'scroll' }}>
            <ReadEditor post={post} setpost={setpost} match={match} setEdit={setEdit} edit={edit} user={post.postedBy} />
          </div>
        </Content>
        <CommentSection post={post} />
      </Layout>
    </Layout>
  )
}
