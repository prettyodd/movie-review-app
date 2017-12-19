import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import GetMovie from './getMovie'

class MainRoute extends React.Component {
    
    render() {
        const Home = () => (
            <div>
              <h1>Welcome to the Tornadoes Website!</h1>
              <Link to="/movie/18">Id 18</Link>
            </div>
          )

        return (
              <main>
                <Switch>
                  <Route exact path='/movie' component={Home}/>
                  <Route path='/movie/:id' component={GetMovie}/>
                </Switch>
              </main>
        )
    }
}

export default MainRoute;