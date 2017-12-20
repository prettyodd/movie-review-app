import React from 'react'
import axios from 'axios'
import ReviewForm from './reviewForm'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          movieId: [],
          review: false,
          externalApiCall: false
        }
    }

    addReview(review) {
        let c = this
        axios.post(`http://localhost:3000/api/movie/${this.props.match.params.id}`, {
            id: c.props.match.params.id,
            title: c.state.movieId[0].title,
            overview: c.state.movieId[0].overview,
            review: review
        })
        .then(function (response) {
            console.log(response)
            c.setState({ review: true })
        })
        .catch(function (error) {
            console.log(error)
        }) 
    }

    onSubmit(e) {
        e.preventDefault();
        this.addReview(this.reviewRefs.value)
    }

    componentDidMount() {
        let c = this
        let movieId = []
        //this.setState({ loading: true })

        axios.get(`http://localhost:3000/api/movie/${this.props.match.params.id}`)
            .then(function (response) {
                if (response.data) {
                    console.log(response.data)
                    movieId.push(response.data)
                    c.setState({ movieId: movieId, loading: false })
                } else {
                    c.setState({ externalApiCall: true })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        if (!movieId) {
          return <div>Sorry, but the movie was not found</div>
        }
    }

    componentDidUpdate() {
        if (this.state.externalApiCall) {
            let c = this
            let movieId = []

            axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`)
            .then(function (response) {
                console.log(response.data)
                movieId.push(response.data)
                c.setState({ movieId: movieId, loading: false, externalApiCall: false })
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }
    
    render () {

        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        } else if (this.state.review) {
            return (
                <div>
                    <div>
                        <h1>{this.state.movieId[0].title}</h1>
                        <h2>Synopsis:</h2> 
                        <p>{this.state.movieId[0].overview}</p>
                    </div>
                    <div>
                        <h3>Your review:</h3>
                        <p>Review content</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <h1>{this.state.movieId[0].title}</h1>
                        <h2>Synopsis:</h2> 
                        <p>{this.state.movieId[0].overview}</p>
                    </div>
                    <ReviewForm 
                        onSubmit={(e)=> this.onSubmit(e)}
                        ref={input => this.reviewRefs = input}
                    />
                </div>
            )
        }
    }
}

export default GetMovie