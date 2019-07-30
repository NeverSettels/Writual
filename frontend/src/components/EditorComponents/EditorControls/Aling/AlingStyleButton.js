import React from 'react'
import { styles, alingStyleMap } from '../../../../StyleMaps'

function ColorStyleButton(props) {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  let style
  if (props.active) {
    style = { ...styles.styleButton, ...alingStyleMap[props.style], color: 'black' }
  } else {
    style = styles.styleButton
  }
  return (
    <div style={style} onMouseDown={onToggle}>
      {props.label}
    </div>
  )
}
export default ColorStyleButton
// { ...style, width: '500px' }
