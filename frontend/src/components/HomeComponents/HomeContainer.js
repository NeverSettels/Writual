import React, { useEffect, useState, useContext } from 'react'
import { Layout, Menu } from 'antd'
import Axios from 'axios'
import Post from '../UniversalCompnents/Post'
import { CATEGORIES } from '../../Types'
import { MyContext } from '../../context'

const { Content, Sider } = Layout

export default function HomeContainer() {
  const context = useContext(MyContext)
  const [posts, setposts] = useState([])

  useEffect(() => {
    Axios.get('https://writual.herokuapp.com/posts')
      .then(({ data }) => {
        setposts(prevState => {
          return [...prevState, ...data.posts]
        })
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <Layout>
      <Sider
        style={{
          backgroundColor: '#d1582b',
          margin: '10vh 0px 0',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div className="logo" />
        <Menu
          style={{ backgroundColor: '#d1582b', color: '#D4dfc2', padding: '15px' }}
          mode="inline"
          defaultSelectedKeys={['4']}
        >
          <h2 style={{ color: '#D4dfc2' }}>Catgories</h2>
          {CATEGORIES.map(category => {
            return (
              <Menu.Item key={category}>
                <span className="nav-text">{category}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ height: '90vh', margin: '10vh 16px 0', overflow: 'initial' }}>
          {posts.map(post => (
            <Post key={post._id} post={post} context={context} />
          ))}
        </Content>
      </Layout>
    </Layout>
  )
}
