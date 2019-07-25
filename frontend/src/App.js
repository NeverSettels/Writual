import React, { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import './App.css'

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

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

  return (
    <div>
      <button onClick={onBoldClick}>Bold</button>
      <div style={{ margin: '20vh', border: '1px solid gray' }}>
        <Editor ref={editor} editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} />
      </div>
    </div>
  )
}

export default App
