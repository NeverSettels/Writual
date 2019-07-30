import React, { useState, useEffect } from 'react'
import { Editor, EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js'
import BlockStyleToolbar, { getBlockStyle } from './EditorControls/Header/BlockStyleToolbar'
import { styles, colorStyleMap, alingStyleMap } from '../../StyleMaps'
import ColorControls from './EditorControls/Color/ColorControls'
import AlingControls from './EditorControls/Aling/AlingControls'
import PublishModal from './PublishModal'
import Authservice from '../../services/auth'
import { Button } from 'antd'
//import MyContext from '../../context'

export default function MyEditor(props) {
  //const context = useContext(MyContext)
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
      .catch(err => props.props.history.push('/'))
  }, [props.props.history])

  const editor = React.useRef(null)

  const onChange = editorState => {
    setEditorState(editorState)
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }
  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }
  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }
  const toggleBlockType = blockType => {
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleColor = toggledColor => _toggleColor(toggledColor)

  function _toggleColor(toggledColor) {
    const selection = editorState.getSelection()
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, editorState.getCurrentContent())
    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')
    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor)
    }
    onChange(nextEditorState)
  }

  const toggleAling = toggledAling => _toggleAling(toggledAling)

  function _toggleAling(toggledAling) {
    const selection = editorState.getSelection()
    // Let's just allow one aling at a time. Turn off all active alings.
    const nextContentState = Object.keys(alingStyleMap).reduce((contentState, aling) => {
      return Modifier.removeInlineStyle(contentState, selection, aling)
    }, editorState.getCurrentContent())
    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')
    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current aling.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, aling) => {
        return RichUtils.toggleInlineStyle(state, aling)
      }, nextEditorState)
    }
    // If the aling is being toggled on, apply it.
    if (!currentStyle.has(toggledAling)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledAling)
    }
    onChange(nextEditorState)
  }
  function save() {
    const draft = convertToRaw(editorState.getCurrentContent())
    const textDraft = `${JSON.stringify(draft)}`
    return textDraft
  }

  // function getcontent() {
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
  // }
  /************************************************************************ */

  return (
    <div>
      <div style={styles.root}>
        <BlockStyleToolbar editorState={editorState} onToggle={toggleBlockType} />
        <button onClick={onBoldClick}>B</button>
        <button onClick={onItalicClick}>I</button>
        <button onClick={onUnderlineClick}>U</button>
        <ColorControls editorState={editorState} onToggle={toggleColor} />
        <AlingControls editorState={editorState} onToggle={toggleAling} />
      </div>

      <div style={{ height: '100vh', margin: '20vh', border: '1px solid gray', overflow: 'scroll' }}>
        <Editor
          customStyleMap={colorStyleMap}
          ref={editor}
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
      <PublishModal
        contentState={contentState}
        setContentState={setContentState}
        save={save}
        user={user}
        Histprops={props}
        saveto={'posts'}
      />
      <PublishModal
        contentState={contentState}
        setContentState={setContentState}
        save={save}
        user={user}
        Histprops={props}
        saveto={'drafts'}
      />

      <Button type="danger">Cancel</Button>
    </div>
  )
}
