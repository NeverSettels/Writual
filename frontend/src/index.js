import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import Routes from './Routes'
import * as serviceWorker from './serviceWorker'
import MyProvider from './context'

ReactDOM.render(
  <MyProvider>
    <Routes />
  </MyProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
