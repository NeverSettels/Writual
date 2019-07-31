import React, { useEffect, useState, useContext } from 'react'
import { Layout, Avatar } from 'antd'
import Axios from 'axios'
import Post from '../UniversalCompnents/Post'
import { CATEGORIES } from '../../Types'
import { MyContext } from '../../context'
import Authservice from '../../services/auth'
const { Content, Sider } = Layout

export default function ProfileContainer(props) {
  const { match } = props
  const context = useContext(MyContext)
  const [posts, setposts] = useState([])
  const [user, setUser] = useState({})


  useEffect(() => {


    Axios.get(`https://writualapp.herokuapp.com/profile/${match.params.id}`)
      .then(({ data }) => {
        console.log(data.user)
        setUser(data.user)
      })
      .catch(err => console.log(err))




  }, [])


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
        <Avatar size={80} src={user.profilePic} />
        <h2>{user.username}</h2>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ height: '90vh', margin: '10vh 16px 0', overflow: 'initial' }}>
          <h1>{user.username}</h1>
        </Content>
      </Layout>
    </Layout>
  )
}
