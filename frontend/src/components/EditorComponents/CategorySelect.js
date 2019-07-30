import React from 'react'
import { Tag } from 'antd'
import { CATEGORIES } from '../../Types'
const { CheckableTag } = Tag

export default function CategorySelect(props) {
  const { categories, setCategories } = props

  function handleChange(tag, checked) {
    const nextSelectedTags = checked ? [...categories, tag] : categories.filter(t => t !== tag)
    console.log('You are interested in: ', nextSelectedTags)
    setCategories(nextSelectedTags)
  }
  return (
    <div>
      <h6 style={{ marginRight: 8, display: 'inline' }}>Categories:</h6>
      {CATEGORIES.map(tag => {
        return (
          <CheckableTag
            key={tag}
            checked={categories.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        )
      })}
    </div>
  )
}
