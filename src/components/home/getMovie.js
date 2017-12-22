import React from 'react'
import axios from 'axios'
import ReviewForm from './reviewForm'
import {
    Link
  } from 'react-router-dom'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          movie: [],
          review: false,
          externalApiCall: false,
          emptyReview: true
        }
    }

    addReview(username, review) {
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
            movie.push(response.data)
            c.setState({ loading: false, review: true, movie: movie})
        })
        .catch(function (error) {
            console.log(error)
        }) 
    }
    onSubmit(e) {
        e.preventDefault();
        this.addReview(this.refs.usernameRefs.value, this.refs.reviewRefs.value)
    }

    componentDidMount() {
        let c = this
        let movie = []

        axios.get(`http://localhost:3000/api/movie/${this.props.match.params.id}`)
            .then(function (response) {
                if (response.data) {
                    movie.push(response.data)
                    c.setState({ movie: movie, loading: false })
                    console.log('request made from local db')
                } else {
                    c.setState({ externalApiCall: true })
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

            axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`)
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
    
    render () {

        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        } else if (this.state.review) {
            return (
                <div>
                    <div>
                        <h1>{this.state.movie[0].title}</h1>
                        <h2>Synopsis:</h2> 
                        <p>{this.state.movie[0].overview}</p>
                    </div>
                    <div>
                        <p>You logged in as: {this.state.movie[0].reviews[0].user}</p>
                        <h3>Your review:</h3>
                        <p>{this.state.movie[0].reviews[0].review}</p>
                        <Link to={`/movie/${this.props.match.params.id}/${this.state.movie[0].reviews[0]._id}`}>edit</Link>
                    </div>
                </div>
            )
        } else if (!this.state.emptyReview) {
            return (
                <div>
                    <div>
                        <h1>{this.state.movie[0].title}</h1>
                        <h2>Synopsis:</h2> 
                        <p>{this.state.movie[0].overview}</p>
                    </div>

                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="review-form">
                        <input 
                            type="text"
                            placeholder="Username"
                            ref="usernameRefs" />
                        <textarea 
                            type="text"
                            placeholder="Write your review..."
                            ref="reviewRefs"/>
                        <span className="input-group-btn">
                          <button type="submit" className="btn btn-info">
                             Sumbit
                          </button>
                        </span>
                        </div>
                    </form>

                    <div>
                        <p>Review list:</p>
                        <p>{this.state.movie[0].reviews[0].review} by {this.state.movie[0].reviews[0].user}</p>
                    </div>
                </div>
            )} else {
                return (
                    <div>
                    <div>
                        <h1>{this.state.movie[0].title}</h1>
                        <h2>Synopsis:</h2> 
                        <p>{this.state.movie[0].overview}</p>
                    </div>

                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="review-form">
                        <input 
                            type="text"
                            placeholder="Username"
                            ref="usernameRefs" />
                        <textarea 
                            type="text"
                            placeholder="Write your review..."
                            ref="reviewRefs"/>
                        <span className="input-group-btn">
                          <button type="submit" className="btn btn-info">
                             Sumbit
                          </button>
                        </span>
                        </div>
                    </form>
                    </div>
                )
            }
        }
    
}

export default GetMovie