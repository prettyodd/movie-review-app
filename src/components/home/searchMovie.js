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
// onChange function will be triggered every time onChange event(assigned to e) occur. target.value is the input value that trigger onChange event.
    onChange(e) {
      
      if (e.target.value) { 
        // this must be assigned to other variables before used with axios
        let c = this;
        // cannot access the event in an asynchronous way(axios).
        let valueObj = e.target.value
        
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US&query=${valueObj}&page=1&include_adult=false`)
          .then(function (response) {
            let movie = []
            for (var i = 0; i < 10; i++) {
              movie.push(response.data.results[i])
            }
            c.setState({data: movie, value: valueObj})
          })
          .catch(function (error) {
              console.log(error)
          })
      } else {
        this.setState({data: []})
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
    