import React from 'react'
import { styles, colorStyleMap } from '../../../../StyleMaps'

function ColorStyleButton(props) {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  let style
  if (props.active) {
    style = { ...styles.styleButton, ...colorStyleMap[props.style] }
  } else {
    style = styles.styleButton
  }
  return (
    <span style={style} onMouseDown={onToggle}>
      {props.label}
    </span>
  )
}
export default ColorStyleButton
