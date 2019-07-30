import React from 'react'
import { COLORS } from '../../../../Types'
import { styles } from '../../../../StyleMaps'
import ColorStyleButton from './ColorStyleButton'

const ColorControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div style={styles.controls}>
      {COLORS.map(type => (
        <ColorStyleButton
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
