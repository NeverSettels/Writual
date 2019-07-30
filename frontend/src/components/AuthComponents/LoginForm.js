import React, { useContext, useState } from 'react'
import useForm from '../../Hooks/useForm'
import AuthService from '../../services/auth'
import { Modal } from 'antd'
import { MyContext } from '../../context'

export default function LoginForm() {
  const [form, handleInputs] = useForm()
  const authService = new AuthService()
  const [visible, setvisible] = useState(false)
  const [confirmLoading, setconfirmLoading] = useState(false)
  const context = useContext(MyContext)

  const showModal = () => {
    setvisible(true)
  }

  const handleOk = () => {
    setconfirmLoading(true)
    authService
      .login(form)
      .then(response => {
        console.log(response)
        context.setUser(response.user)
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
      <span type="primary" onClick={showModal}>
        Login
      </span>
      <Modal title="Login" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <input type="email" name="email" onChange={e => handleInputs(e)} />
        <input type="password" name="password" onChange={e => handleInputs(e)} />
      </Modal>
    </div>
  )
}
