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

  useEffect(() => {
    const authservice = new Authservice()

    authservice
      .profile()
      .then(res => {
        const { user } = res.data
        setUser(user)
        if (user.bookmarked) {
          console.log(user)
          let bool = false
          user.bookmarked.map(marked => {
            if (post._id === marked) {
              bool = true
            }
            return ('')
          })
          setbookmarked(bool)
        }
      })
      .catch(err => console.log(err))




    // eslint-disable-next-line
  }, [])

  function bookmarkState() {
    if (bookmarked) {
      setnumBookmarks(prevState => prevState - 1)
      setbookmarked(!bookmarked)
      Axios.patch(`https://writualapp.herokuapp.com/profile/${user._id}`, { $pull: { bookmarked: post._id } })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      setnumBookmarks(prevState => prevState + 1)
      setbookmarked(!bookmarked)
      Axios.patch(`https://writualapp.herokuapp.com/profile/${user._id}`, { $push: { bookmarked: post._id } })
        .then()
        .catch(err => console.log(err))
    }
  }
  function postBookmark() {
    Axios.patch(`https://writualapp.herokuapp.com/posts/${post._id}`, { numBookmarks: numBookmarks })
      .then()
      .catch(err => console.log(err))

    return numBookmarks
  }
  function bookmark() {
    bookmarkState()
  }
  return (
    <div
      className="post_container"
    >
      <Link to={`/profile/${post.postedBy._id}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '5px' }}>

          <Avatar size={60} src={post.postedBy.profilePic} />
          <p>
            <strong>{post.postedBy.username}</strong>
          </p>
        </div></Link>

      <div>
        <h2>{post.title}</h2>
        <p>{post.summary}</p>
        <div>
          {post.categories.map(category => (
            <Tag>{category}</Tag>
          ))}
        </div>
      </div>
      <div>

        {context.state.isLogged ? (
          bookmarked ? (
            <p>
              <img onClick={bookmark} src="/bookmarkFilled.png" alt="BookMarked" />

            </p>
          ) : (
              <p>
                <img onClick={bookmark} src="/bookmarkEmpty.png" alt="BookMarked" />

              </p>
            )
        ) : (
            ''
          )}
        <p>{postBookmark()}</p>
        <Link to={`/read/${post._id}`}><img src="./book.png" alt="book" /></Link>
      </div>
    </div>
  )
}
