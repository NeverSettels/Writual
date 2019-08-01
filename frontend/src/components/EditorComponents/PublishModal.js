import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'

import { Modal, Button, Alert } from 'antd'
import CategorySelect from './CategorySelect'

import ApiService from '../../services/post'

export default function PublishModal(props) {
  const [form, handleInputs] = useForm()
  const [categories, setCategories] = useState([])
  const [visible, setvisible] = useState(false)
  const [confirmLoading, setconfirmLoading] = useState(false)

  const { contentState, save, setContentState, user, Histprops, saveto } = props
  const apiService = new ApiService()
  const showModal = () => {
    setContentState(save())
    setvisible(true)
  }
  const handleOk = () => {
    apiService
      .newPost({ ...form, categories, content: contentState, postedBy: user._id }, saveto)
      .then(res =>
        saveto === 'draft' ? (
          <Alert message="Saved to Drafts" type="success" />
        ) : (
            <Alert message="Posted" type="success" />
          )
      )
      .catch(err => console.log(err))

    setconfirmLoading(true)
    setTimeout(() => {
      setvisible(false)
      setconfirmLoading(false)
      Histprops.props.history.push('/profile')
    }, 3000)
  }

  const handleCancel = () => {
    setvisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {saveto === 'posts' ? <span>Publish</span> : <span>Save Draft</span>}
      </Button>
      <Modal
        title="Finish Up!"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <input type="text" name="title" placeholder="Add a title" onChange={e => handleInputs(e)} />
        <input
          type="text"
          name="summary"
          placeholder="Add a short Summary"
          maxLength="140"
          onChange={e => handleInputs(e)}
        />
        <h3>Choose Categories</h3>
        <CategorySelect categories={categories} setCategories={setCategories} />
      </Modal>
    </>
  )
}
