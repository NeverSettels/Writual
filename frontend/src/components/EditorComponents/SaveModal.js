import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'

import { Modal, Button } from 'antd'
import CategorySelect from './CategorySelect'
import Axios from 'axios'

export default function SaveModal(props) {
  const [form, handleInputs] = useForm()
  const [categories, setCategories] = useState([])
  const [visible, setvisible] = useState(false)
  const [confirmLoading, setconfirmLoading] = useState(false)
  const { contentState, save, setContentState } = props
  const showModal = () => {
    setContentState(save())
    setvisible(true)
  }
  const handleOk = () => {
    Axios.post('http://localhost:3000/posts', { ...form, categories, content: contentState })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    setconfirmLoading(true)
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
      <Button type="primary" onClick={showModal}>
        Save
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
          maxlength="140"
          onChange={e => handleInputs(e)}
        />
        <h3>Choose Categories</h3>
        <CategorySelect categories={categories} setCategories={setCategories} />
      </Modal>
    </div>
  )
}
