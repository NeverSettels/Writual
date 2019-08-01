import React from 'react'
import { styles } from "../../../../StyleMaps";

function BlockStyleButton(props) {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }

  let style
  if (props.active) {
    style = { ...styles.styleButton, color: 'black' }
  } else {
    style = styles.styleButton
  }

  return (
    <span style={style} onClick={onToggle}>
      {props.label}
    </span>
  )
}

export default BlockStyleButton
