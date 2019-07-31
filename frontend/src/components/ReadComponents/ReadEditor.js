import React, { useState, useEffect } from 'react'
import { Editor, EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js'
import Authservice from '../../services/auth'

export default function ReadEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [contentState, setContentState] = useState('')
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

    //   Axios.get('http://localhost:3000/posts')
    //     .then(response => {
    //       const data = response.data
    //       data.posts.map(e => {
    //         console.log('data', data)
    //         const cont = JSON.stringify(e.content)
    //         console.log(cont)
    //         const obj = {
    //           blocks: [
    //             {
    //               key: 'cqpgr',
    //               text: 'ervrvrv',
    //               type: 'unstyled',
    //               depth: 0,
    //               inlineStyleRanges: [],
    //               entityRanges: [],
    //               data: {}
    //             }
    //           ],
    //           entityMap: {}
    //         }
    //         const text =
    //           '{"blocks":[{"key":"cqpgr", "text":"Te Faltan manos por que esto jalas","type": "unstyled","depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {}}],"entityMap": {}}'

    //         console.log('obj', obj)
    //         const contentState = convertFromRaw(JSON.parse(text))
    //         return setEditorState(prevState => EditorState.createWithContent(contentState))
    //       })
    //     })
    //     .catch(err => console.log(err))
  }, [])

  return <Editor readOnly={true} />
}
