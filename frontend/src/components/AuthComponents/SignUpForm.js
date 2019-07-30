import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'
import AuthService from '../../services/auth'
import { Modal } from 'antd'

export default function SignUpForm() {
  const [form, handleInputs] = useForm()
  const authService = new AuthService()
  const [visible, setvisible] = useState(false)
  const [confirmLoading, setconfirmLoading] = useState(false)

  const showModal = () => {
    setvisible(true)
  }

  const handleOk = () => {
    setconfirmLoading({
      confirmLoading: true
    })
    authService
      .signup(form)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
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
      <span onClick={showModal}>Sing Up</span>
      <Modal title="Sign Up" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <input type="text" name="username" placeholder="Pick a pen name" onChange={e => handleInputs(e)} />
        <input type="email" name="email" placeholder="Your Email" onChange={e => handleInputs(e)} />
        <input type="password" placeholder="Pick a Password" name="password" onChange={e => handleInputs(e)} />
      </Modal>
    </div>
  )
}
