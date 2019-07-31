import React, { useState, useEffect } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { colorStyleMap } from '../../StyleMaps'
import { getBlockStyle } from '../EditorComponents/EditorControls/Header/BlockStyleToolbar'

import Axios from 'axios'

export default function ReadEditor(props) {
  const { match, post, setpost } = props
  const { params } = match
  console.log(params.id)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    Axios.get(`https://writualapp.herokuapp.com/post/${params.id}`)
      .then(response => {
        const data = response.data
        console.log(data.post.content)
        setpost(data.post)
        const contentState = convertFromRaw(JSON.parse(data.post.content))
        setEditorState(prevState => EditorState.createWithContent(contentState))
      })
      .catch(err => console.log(err))
    // Axios.get('http://localhost:3000/posts')
    //   .then(response => {
    //     const data = response.data
    //     data.posts.map(e => {
    //       console.log('data', data)
    //       const cont = JSON.stringify(e.content)
    //       console.log(cont)
    //       const obj = {
    //         blocks: [
    //           {
    //             key: 'cqpgr',
    //             text: 'ervrvrv',
    //             type: 'unstyled',
    //             depth: 0,
    //             inlineStyleRanges: [],
    //             entityRanges: [],
    //             data: {}
    //           }
    //         ],
    //         entityMap: {}
    //       }
    //       const text =
    //         '{"blocks":[{"key":"cqpgr", "text":"Te Faltan manos por que esto jalas","type": "unstyled","depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {}}],"entityMap": {}}'

    //       console.log('obj', obj)
    //       const contentState = convertFromRaw(JSON.parse(text))
    //       return setEditorState(prevState => EditorState.createWithContent(contentState))
    //     })
    //   })
    //   .catch(err => console.log(err))
  }, [params.id, setpost])

  return (
    <Editor editorState={editorState} customStyleMap={colorStyleMap} blockStyleFn={getBlockStyle} readOnly={true} />
  )
}
