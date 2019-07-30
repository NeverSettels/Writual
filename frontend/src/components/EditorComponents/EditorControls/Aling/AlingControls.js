import React from 'react'
import { TEXT_ALING } from '../../../../Types'
import { styles } from '../../../../StyleMaps'
import AlingStyleButton from './AlingStyleButton'

const ColorControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div style={styles.controls}>
      {TEXT_ALING.map(type => (
        <AlingStyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

export default ColorControls
