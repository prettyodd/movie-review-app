
// What we need to do is set axios to make a get request everytime user type on field value

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Test extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      value: '',
      data: ''
      }
    }

    onChange(e) {
      this.setState({value: e.target.value })

      if (this.state.value.length > 5) {
        let e = this;
        
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
        .then(function (response) {
          e.setState({data: response})
        })
        .catch(function (error) {
            console.log(error)
        })
      }
    }

    render () {
        //Movie list: <code>{this.state.data}</code>
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