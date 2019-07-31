import React, { useState, useEffect } from 'react'
import Authservice from '../../services/auth'
import { Link } from 'react-router-dom'
import { Avatar, Tag } from 'antd'
import Axios from 'axios'

export default function Post(props) {
  const { post, context } = props
  const [numBookmarks, setnumBookmarks] = useState(post.numBookmarks)

  const [bookmarked, setbookmarked] = useState(false)
  const [user, setUser] = useState({})
  //const useForceUpdate = () => setbookmarked()[1]
  useEffect(() => {
    const authservice = new Authservice()
    authservice
      .profile()
      .then(res => {
        const { user } = res.data
        setUser(user)
      })
      .catch(err => console.log(err))

    post.postedBy.bookmarked.map(marked => {
      if (post._id === marked) {
        return setbookmarked(true)
      } else {
        return setbookmarked(false)
      }
    })
  }, [post._id, post.postedBy.bookmarked])
  function bookmarkState() {
    if (bookmarked) {
      setnumBookmarks(prevState => prevState - 1)
      setbookmarked(!bookmarked)
      Axios.patch(`https://writualapp.herokuapp.com/user/${user._id}`, { $pull: { bookmarked: post._id } })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      setnumBookmarks(prevState => prevState + 1)
      setbookmarked(!bookmarked)
      Axios.patch(`https://writualapp.herokuapp.com/user/${user._id}`, { $push: { bookmarked: post._id } })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }
  function postBookmark() {
    console.log(numBookmarks)
    Axios.patch(`https://writualapp.herokuapp.com/posts/${post._id}`, { numBookmarks: numBookmarks })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))

    return numBookmarks
  }
  function bookmark() {
    bookmarkState()
    //forceUpdate()
    //useForceUpdate()
    // Axios.patch(`https://writualapp.herokuapp.com/posts/${post._id}`, numBookmarks)
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => console.log(err))
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px',
        border: '1px solid #6a4944',
        padding: '10px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={post.postedBy.profilePic} />
        <p>
          <strong>{post.postedBy.username}</strong>
        </p>
      </div>
      <div>
        <h2>{post.title}</h2>
        <p>{post.summary}</p>
        {post.categories.map(category => (
          <Tag>{category}</Tag>
        ))}
      </div>
      <div>
        <p>{postBookmark()}</p>
        {context.state.isLogged ? (
          bookmarked ? (
            <p>
              <strong>Bookmarked!</strong>
              <button onClick={bookmark}>Bookmark</button>
            </p>
          ) : (
            <button onClick={bookmark}>Bookmark</button>
          )
        ) : (
          ''
        )}

        <Link to="/read">read</Link>
      </div>
    </div>
  )
}
