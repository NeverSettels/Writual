import React from 'react'
import BlockStyleButton from './BlockStyleButton'
import HeaderStyleDropdown from './HeaderStyleDropdown'
import { HEADER_TYPES, BLOCK_TYPES } from '../../../../Types'

export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'myBlockquote'
    default:
      return null
  }
}

const BlockStyleToolbar = props => {
  const { editorState, onToggle } = props

  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <span style={{ display: 'flex' }}>
      <HeaderStyleDropdown headerOptions={HEADER_TYPES} active={blockType} onToggle={onToggle} />
      {BLOCK_TYPES.map(type => {
        return (
          <BlockStyleButton
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
            key={type.label}
            type={type}
          />
        )
      })}
    </span>
  )
}

export default BlockStyleToolbar
