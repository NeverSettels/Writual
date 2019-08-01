import React, { useState } from 'react'
import { Modal } from 'antd'
import Axios from 'axios';
export default function DeletePost(props) {

    const { post } = props

    const [visible, setvisible] = useState(false)
    const [confirmLoading, setconfirmLoading] = useState(false)

    const showModal = () => {
        setvisible(true)
    }

    const handleOk = () => {
        setconfirmLoading({
            confirmLoading: true
        })

        Axios.delete(`https://writualapp.herokuapp.com/posts/${post._id}`).then(res => console.log(res.data)).catch(res => console.log(res))
        setTimeout(() => {
            setvisible(false)
            setconfirmLoading(false)
        }, 2000)

    }

    const handleCancel = () => {
        console.log('Clicked cancel button')
        setvisible(false)
    }

    return (
        <div>
            <img onClick={showModal} src="/cancel.png" alt="X" />
            <Modal title="Delete Post" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                <h2>Are you Sure you want to delete</h2>
            </Modal>
        </div>
    )

}
