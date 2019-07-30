import React from 'react'

function BlockStyleButton(props) {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }

  let className = 'RichEditor-styleButton'
  if (props.active) {
    className += ' RichEditor-activeButton'
  }

  return (
    <button className={className} onClick={onToggle}>
      {props.label}
    </button>
  )
}

export default BlockStyleButton
