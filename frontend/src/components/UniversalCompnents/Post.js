import React, { useState } from 'react'
import { Avatar, Tag } from 'antd'

export default function Post(props) {
  const { post, context } = props
  const [numBookmarks, setnumBookmarks] = useState(post.numBookmarks)
  const [bookmarked, setbookmarked] = useState(false)
  function bookmark() {
    if (bookmarked) {
      setnumBookmarks(numBookmarks - 1)
      setbookmarked(!bookmarked)
    } else {
      setnumBookmarks(numBookmarks + 1)
      setbookmarked(!bookmarked)
    }
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
        <p>{numBookmarks}</p>
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

        <p>read</p>
      </div>
    </div>
  )
}
