import React from 'react'
import axios from 'axios'
import ReviewForm from './reviewForm'
import {
    Link
  } from 'react-router-dom'
import MovieHeader from './movieHeader'
import ReviewBody from './reviewBody'
import ReviewList from './reviewList'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          movie: ''
          userReview: false,
          externalApiCall: false,
          emptyReview: true
        }
    }

    addReview = (username, review) => {
        let c = this
        axios.post(`http://localhost:3000/api/movie/${this.props.match.params.id}`, {
            id: c.props.match.params.id,
            title: c.state.movie[0].title,
            overview: c.state.movie[0].overview,
            reviews: [
                {
                    user: username,
                    review: review
                }
            ]
        })
        .then(function (response) {
            console.log(response)
            let movie = []
            movie = response.data
            c.setState({ loading: false, userReview: true, movie: movie})
        })
        .catch(function (error) {
            console.log(error)
        }) 
    }

    componentDidMount() {
        let c = this
        let movie = []

        axios.get(`http://localhost:3000/api/movie/${this.props.match.params.id}`) // check if movie exist in local database..
            .then(function (response) {
                if (response.data) {
                    movie.push(response.data)
                    c.setState({ movie: movie, loading: false })
                    console.log('request made from local db')
                } else {
                    c.setState({ externalApiCall: true }) // ..if not, allow for the GET request for external database
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        if (!movie) {
          return <div>Sorry, but the movie was not found</div>
        }
    }

    componentDidUpdate() { 
        if (this.state.externalApiCall) {
            let c = this
            let movie = []

            axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`) // Get data from external database
            .then(function (response) {
                movie.push(response.data)
                c.setState({ movie: movie, loading: false, externalApiCall: false })
                console.log('request made from external db')
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }

    loading() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        } else {
            return (<MovieHeader movie={this.state.movie} />)
        }
    }
    
    userReview() { // if logged in user review exist
        if (this.state.userReview) { 
            return (<ReviewBody movie={this.state.movie} paramsId={this.props.match.params.id} />)
        } else {
            return (<ReviewForm addReview={this.addReview} />)
        }
    }

    emptyReview() { // if false (review completely empty, which mean no ever post a review, or all review has been deleted)
        if (!this.state.emptyReview) { 
            return (<ReviewList movie={this.state.movie} />)
        } else {
            return (<p>No review yet.</p>)
        }
    }
    
    render () {
        return (
            <div classname="App">
                {this.loading()}
                {this.userReview()}
                {this.emptyReview()}
            </div>
        )
    }
}

export default GetMovie