import React from 'react'
import MyEditor from '../EditorComponents/MyEditor'
export default function CreateContainer(props) {
  return (
    <div style={{ padding: '10vh 0 0 0' }}>
      <MyEditor props={props} />
    </div>
  )
}
