import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'

import List from './pages/List'
import Upload from './pages/Upload'

function App() {
  return (
    <div className="App">

      <Router>
      <Nav />
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route exact path="/">
            <List />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
