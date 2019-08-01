import React from 'react'
import { Avatar, Tag } from 'antd'
import { Link } from 'react-router-dom'
import DeletePost from '../UniversalCompnents/DeletePost'

export default function ProfilePost(props) {
    const { post, user, mine } = props

    return (
        <div
            className="post_container"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar size={60} src={user.profilePic} />
                <p>
                    <strong>{user.username}</strong>
                </p>
            </div>
            <div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                {post.categories.map(category => (
                    <Tag key={category}>{category}</Tag>
                ))}
            </div>
            <div>
                {mine ? <DeletePost post={post} /> : ''}
                <p>{post.numBookmarks}</p>
                <Link to={`/read/${post._id}`}> <img style={{ height: '34px' }} src="https://image.flaticon.com/icons/svg/864/864702.svg" alt="book" /></Link>
            </div>
        </div>
    )
}
