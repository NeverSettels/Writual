import React, { useState, useEffect } from 'react'
import { Editor, EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js'
import BlockStyleToolbar, { getBlockStyle } from './EditorControls/Header/BlockStyleToolbar'
import { styles, colorStyleMap } from '../../StyleMaps'
import ColorControls from './EditorControls/Color/ColorControls'

import PublishModal from './PublishModal'
import Authservice from '../../services/auth'



export default function MyEditor(props) {

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




  function save() {
    const draft = convertToRaw(editorState.getCurrentContent())
    const textDraft = `${JSON.stringify(draft)}`
    return textDraft
  }


  return (
    <div>
      <div style={styles.root}>
        <BlockStyleToolbar editorState={editorState} onToggle={toggleBlockType} />
        <span style={styles.styleButton} onClick={onBoldClick}>B</span>
        <span style={styles.styleButton} onClick={onItalicClick}>I</span>
        <span style={styles.styleButton} onClick={onUnderlineClick}>U</span>
        <ColorControls editorState={editorState} onToggle={toggleColor} />
      </div>
      <PublishModal
        contentState={contentState}
        setContentState={setContentState}
        save={save}
        user={user}
        Histprops={props}
        saveto={'posts'}
      />

      <div style={styles.editor}>
        <Editor
          customStyleMap={colorStyleMap}
          ref={editor}
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>



    </div>
  )
}
