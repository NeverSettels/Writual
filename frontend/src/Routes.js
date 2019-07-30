import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomeContainer from './components/HomeComponents/HomeContainer'
import NavBar from './components/UniversalCompnents/NavBar'
import CreateContainer from './components/CreateComponents/CreateContainer'

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/create" component={CreateContainer} />
        <Route exact path="/profile" component={HomeContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
