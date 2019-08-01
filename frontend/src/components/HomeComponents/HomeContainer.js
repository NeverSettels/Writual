import React, { useEffect, useState, useContext } from 'react'
import { Layout, Menu, Empty } from 'antd'
import Axios from 'axios'
import Post from '../UniversalCompnents/Post'
import { CATEGORIES } from '../../Types'
import { MyContext } from '../../context'

const { Content, Sider } = Layout

export default function HomeContainer() {
  const context = useContext(MyContext)
  const [posts, setposts] = useState([])

  useEffect(() => {
    Axios.get('https://writualapp.herokuapp.com/posts')
      .then(({ data }) => {
        setposts(prevState => {
          return [...prevState, ...data.posts]
        })
      })
      .catch(err => console.log(err))
  }, [])

  function filter(category) {
    Axios.get(`https://writualapp.herokuapp.com/posts/${category}`)
      .then(({ data }) => {
        setposts(prevState => {
          return [...data.posts]
        })
      })
      .catch(err => console.log(err))
  }
  function filterAll() {
    Axios.get(`https://writualapp.herokuapp.com/posts`)
      .then(({ data }) => {
        setposts(prevState => {
          return [...data.posts]
        })
      })
      .catch(err => console.log(err))
  }
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
          <Menu.Item>
            <h2 className="nav-text" style={{ color: '#D4dfc2' }} onClick={filterAll}>
              <u>All</u>
            </h2>
          </Menu.Item>
          {CATEGORIES.map(category => {
            return (
              <Menu.Item key={category}>
                <span className="nav-text" onClick={() => filter(category)}>
                  {category}
                </span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ height: '90vh', margin: '10vh 16px 0', overflow: 'initial' }}>
          {posts.length === 0 ? <Empty
            image="./writer.png"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                Oops no posts yet, go write some, or come back later!
      </span>
            }
          /> : posts.map(post => (
            <Post key={post._id} post={post} context={context} />
          ))}

        </Content>
      </Layout>
    </Layout>
  )
}
