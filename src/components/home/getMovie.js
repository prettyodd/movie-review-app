import React from 'react'
import axios from 'axios'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: false,
          movieId: []
        }
    }

    componentWillMount() {
        let c = this
        let movieId = []
        this.setState({ loading: true })

        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`)
            .then(function (response) {
                movieId.push(response.data)
                c.setState({ movieId: movieId })
                c.setState({ loading: false })
            })
            .catch(function (error) {
                console.log(error)
            })

        if (!movieId) {
          return <div>Sorry, but the movie was not found</div>
        }
    }
    
    render () {
        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        }
        return (
            <div>
                <h1>{this.state.movieId[0].title}</h1>
                <h2>Synopsis: {this.state.movieId[0].overview}</h2>
            </div>
        )
    }
}

export default GetMovie