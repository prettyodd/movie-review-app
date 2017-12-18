
// What we need to do is set axios to make a get request everytime user type on field value

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Test extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      value: ''
      }
    }
    onChange(e) {
      this.setState({value: e.target.value })
    }

    render () {
      return (
        <div>
          <input
            type="text"
            onChange={this.onChange.bind(this)}
          />
          You typed: <code>{this.state.value}</code>
        </div>
      )
    }
}

export default Test;