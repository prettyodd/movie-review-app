import React from 'react'
import SearchMovie from './searchMovie'
import GetMovie from './getMovie'
import { Route, Link, Switch } from 'react-router-dom'

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={SearchMovie}/>
      <Route path='/movie/:id' component={GetMovie}/>
    </Switch>
  </div>
)

export default App;