import React, { useState } from 'react'

const useForceUpdate = () => useState()[1]

const UseForceRender = () => {
  const forceUpdate = useForceUpdate()

  console.log('rendering')
  return <button onClick={forceUpdate}>Click To Render</button>
}

export default UseForceRender
