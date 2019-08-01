import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'
import { EditorState, convertFromRaw } from 'draft-js';
import { Modal, Button } from 'antd'
import CategorySelect from '../EditorComponents/CategorySelect'
import Axios from 'axios'


export default function UpdateModal(props) {
    const { contentState, save, setContentState, post, setEditorState, setEdit } = props
    const [form, handleInputs] = useForm()
    const [categories, setCategories] = useState([...post.categories])
    const [visible, setvisible] = useState(false)
    const [confirmLoading, setconfirmLoading] = useState(false)


    const showModal = () => {
        setContentState(save())
        setvisible(true)
    }
    const handleOk = () => {

        Axios.patch(`https://writualapp.herokuapp.com/posts/${post._id}`, { ...form, categories, content: contentState }).then(res => {
            const { data } = res
            setEditorState(prevState => EditorState.createWithContent(convertFromRaw(JSON.parse(data.post.content))))
            setEdit(false)
            console.log(res)
        })
            .catch(err => console.log(err))
        setconfirmLoading(true)
        setTimeout(() => {
            setvisible(false)
            setconfirmLoading(false)

        }, 3000)
    }
    const handleCancel = () => {
        setvisible(false)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Update
      </Button>
            <Modal
                title="Finish Up Your Changes!"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <input type="text" name="title" placeholder="Change title?" onChange={e => handleInputs(e)} />
                <input
                    type="text"
                    name="summary"
                    placeholder="Change Summary?"
                    maxLength="140"
                    onChange={e => handleInputs(e)}
                />
                <h3>Choose Categories</h3>
                <CategorySelect categories={categories} setCategories={setCategories} />
            </Modal>
        </>
    )
}
