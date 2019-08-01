import React, { useState, useEffect } from 'react'
import Authservice from '../../services/auth'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import moment from 'moment'
import Axios from 'axios'

const { TextArea } = Input

const CommentList = ({ comments, post }) => {
  useEffect(() => {
    if (comments.length === 1) {
      console.log('posted')

      Axios.post(`https://writualapp.herokuapp.com/comments`, { content: comments, postedOn: post._id })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    } else {
      Axios.patch(`https://writualapp.herokuapp.com/comments/${post._id}`, { content: comments })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }, [comments, post, post._id])
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  )
}

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
)

export default function CommentSection(props) {
  const { post } = props
  const [comments, setComment] = useState([])
  const [submitting, setsubmitting] = useState(false)
  const [value, setvalue] = useState('')
  const [user, setUser] = useState({})
  useEffect(() => {
    const authservice = new Authservice()
    authservice
      .profile()
      .then(res => {
        const { user } = res.data
        setUser(user)
      })
      .catch(err => console.log(err))

    if (post._id) {
      Axios.get(`https://writualapp.herokuapp.com/comments/${post._id}`)
        .then(({ data }) => {
          if (data.comment) {
            let commentData = []

            data.comment.content.map(e => commentData.push(e[0].content[0])) /*setComment(data.comments.content)*/

            //setComment(commentData)
          }
        })
        .catch(err => console.log(err))
    }
  }, [post, post._id])
  const handleSubmit = () => {
    if (!value) {
      return
    }

    setsubmitting(true)

    setTimeout(() => {
      setsubmitting(false)
      setvalue('')
      setComment([
        {
          author: user.username,
          avatar: user.profilePic,
          content: <p>{value}</p>,
          datetime: moment().fromNow()
        },
        ...comments
      ])
    }, 1000)
  }

  const handleChange = e => {
    setvalue(e.target.value)
  }

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} post={post} />}
      <Comment
        avatar={<Avatar src={user.profilePic} alt="Han Solo" />}
        content={
          <CommentEditor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />
        }
      />
    </div>
  )
}
