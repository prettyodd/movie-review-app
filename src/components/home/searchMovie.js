import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MovieList from './movieList';

class SearchMovie extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: '',
        data: []
      }
    }

    onChange(e) {
      this.setState({value: e.target.value })

      if (this.state.value) {
        let e = this;
        
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
        .then(function (response) {
          let movie = []
          for (var i = 0; i < 10; i++) {
            movie.push(response.data.results[i])
          }
          e.setState({data: movie})
        })
        .catch(function (error) {
            console.log(error)
        })
      }
    }

    render () {
      return (
        <div>
          <input type="text" onChange={this.onChange.bind(this)}/>
          <MovieList lists={this.state.data} />
        </div>
      )
    }
}

export default SearchMovie;
    