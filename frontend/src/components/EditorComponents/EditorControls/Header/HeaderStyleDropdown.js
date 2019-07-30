import React from 'react'

function HeaderStyleDropdown(props) {
  const onToggle = event => {
    const value = event.target.value
    props.onToggle(value)
  }

  return (
    <select value={props.active} onChange={onToggle}>
      <option value="">Header Levels</option>
      {props.headerOptions.map((heading, i) => {
        return (
          <option key={i} value={heading.style}>
            {heading.label}
          </option>
        )
      })}
    </select>
  )
}

export default HeaderStyleDropdown
