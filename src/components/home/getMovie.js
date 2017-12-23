import React from 'react'
import axios from 'axios'
import ReviewForm from './reviewForm'
import { Link } from 'react-router-dom'
import MovieHeader from './movieHeader'
import ReviewBody from './reviewBody'
import ReviewList from './reviewList'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          movie: '',
          userReview: false,
          externalApiCall: false,
          emptyReview: true,
          currentUser: '',
          currentReview: ''
        }
    }

    addReview = (usernameRefs, reviewRefs) => { // trigger when user submit review form
        let c = this

        if (!this.state.externalApiCall) { // if movie data available on local database, post a new review
            axios.post(`http://localhost:3000/api/movie/${this.props.match.params.id}/reviews`, {
                reviews: {
                    user: usernameRefs,
                    review: reviewRefs
                }
            })
            .then(function (response) {
                console.log(response)
                c.setState({
                    movie: {
                        ...c.state.movie,
                        reviews: response.data.reviews
                    },
                    currentUser: usernameRefs,
                    currentReview: reviewRefs,
                    userReview: true
                })
            })
            .catch(function (error) {
                console.log(error)
            })

        } else { // post new movie with review
            axios.post(`http://localhost:3000/api/movie/${this.props.match.params.id}`, {
                id: c.props.match.params.id,
                title: c.state.movie.title,
                overview: c.state.movie.overview,
                reviews: [
                    {
                        user: username,
                        review: review
                    }
                ]
            })
            .then(function (response) {
                console.log(response)
                c.setState({ 
                    movie: response.data,
                    loading: false,
                    userReview: true,
                    currentReview: reviewRefs,
                    currentUser: usernameRefs
                })
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }

    componentDidMount() {
        let c = this

        axios.get(`http://localhost:3000/api/movie/${this.props.match.params.id}`) // check if movie exist in local database..
            .then(function (response) {
                if (response.data) {
                    c.setState({ movie: response.data, loading: false })
                    console.log('request made from local db')
                } else {
                    c.setState({ externalApiCall: true }) // ..if not, allow for the GET request for external database
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        if (!this.state.movie) {
          return <div>Sorry, but the movie was not found</div>
        }
    }

    componentDidUpdate() { 
        if (this.state.externalApiCall) {
            let c = this

            axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`) // Get data from external database
            .then(function (response) {
                c.setState({ movie: response.data, loading: false, externalApiCall: false })
                console.log('request made from external db')
                //if (response.data.reviews)
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
            return (<ReviewBody movie={this.state.movie} paramsId={this.props.match.params.id} currentUser={this.state.currentUser} currentReview={this.state.currentReview} />)
        } else {
            return (<ReviewForm addReview={this.addReview} />)
        }
    }

    emptyReview() { // if review exist
        if (this.state.movie.reviews) { 
            return (<ReviewList movie={this.state.movie} />)
        } else {
            return (<p>No review yet.</p>)
        }
    }
    
    render () {
        return (
            <div className="App">
                {this.loading()}
                {this.userReview()}
                {this.emptyReview()}
            </div>
        )
    }
}

export default GetMovie