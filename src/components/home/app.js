import React from 'react';
import MyInput from './searchMovie';
import Test from './api'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyInput />
        <Test />
      </div>
    );
  }
}

export default App;
