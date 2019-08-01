import React, { useState, useEffect } from 'react'
import { Editor, EditorState, RichUtils, Modifier, convertFromRaw, convertToRaw } from 'draft-js'
import { styles, colorStyleMap } from '../../StyleMaps'
import BlockStyleToolbar, { getBlockStyle } from '../EditorComponents/EditorControls/Header/BlockStyleToolbar'
import ColorControls from '../EditorComponents/EditorControls/Color/ColorControls'
import Axios from 'axios'
import UpdateModal from './UpdateModal'

export default function ReadEditor(props) {
  const { match, edit, setpost, user, post, setEdit } = props
  const { params } = match
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [contentState, setContentState] = useState('')
  useEffect(() => {
    Axios.get(`https://writualapp.herokuapp.com/post/${params.id}`)
      .then(response => {
        const data = response.data
        setpost(data.post)
        const contentState = convertFromRaw(JSON.parse(data.post.content))
        setEditorState(prevState => EditorState.createWithContent(contentState))
      })
      .catch(err => console.log(err))
  }, [params.id, setpost])
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
    <>
      {edit ? <div>
        <div style={styles.root}>
          <BlockStyleToolbar editorState={editorState} onToggle={toggleBlockType} />
          <span style={styles.styleButton} onClick={onBoldClick}>B</span>
          <span style={styles.styleButton} onClick={onItalicClick}>I</span>
          <span style={styles.styleButton} onClick={onUnderlineClick}>U</span>
          <ColorControls editorState={editorState} onToggle={toggleColor} />
        </div>
        <UpdateModal
          contentState={contentState}
          setContentState={setContentState}
          setEditorState={setEditorState}
          setEdit={setEdit}
          save={save}
          user={user}
          Histprops={props}
          post={post}
        />
        <hr />
      </div> : ''}

      <div>
        {edit ? <Editor customStyleMap={colorStyleMap}
          ref={editor}
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={onChange}

          handleKeyCommand={handleKeyCommand} /> : <Editor onChange={onChange} editorState={editorState} customStyleMap={colorStyleMap} blockStyleFn={getBlockStyle} readOnly={true} />}
      </div>
    </>
  )
}