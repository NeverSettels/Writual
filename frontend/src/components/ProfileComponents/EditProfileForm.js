import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'
import { Modal } from 'antd'
import Axios from 'axios';
export default function EditProfileForm(props) {
    const { user, setUser } = props
    const [form, handleInputs] = useForm()
    const [visible, setvisible] = useState(false)
    const [confirmLoading, setconfirmLoading] = useState(false)

    const showModal = () => {
        setvisible(true)
    }

    const handleOk = () => {
        setconfirmLoading({
            confirmLoading: true
        })
        console.log(form)
        Axios.patch(`https://writualapp.herokuapp.com/profile/${user._id}`, form).then(res => setUser(res.data.post)).catch(res => console.log(res))
        setTimeout(() => {
            setvisible(false)
            setconfirmLoading(false)
        }, 2000)
        console.log(user)
    }

    const handleCancel = () => {
        console.log('Clicked cancel button')
        setvisible(false)
    }

    return (
        <div>
            <span onClick={showModal}>Edit Profile</span>
            <Modal title="Edit" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                <input type="text" name="username" placeholder="Change your pen name" onChange={e => handleInputs(e)} />
                <input type="email" name="email" placeholder="Update email" onChange={e => handleInputs(e)} />
                <input type="text" placeholder="Up date your bio" name="bio" onChange={e => handleInputs(e)} />
            </Modal>
        </div>
    )
}
