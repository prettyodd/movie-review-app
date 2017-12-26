import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieHeader from './movieHeader'
import ReviewBody from './reviewBody'
import Login from './login'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          movie: { id: '', title: '', overview: '', reviews: [] },
          externalApiCall: false,
          externalApiPost: false,
          emptyReview: true,
          currentUser: '',
          currentReview: '',
          editReview: false,
        }
    }

    logOut = () => {
        console.log('logged out')
        this.setState({ currentUser: '', currentReview: '' })
    }

    onEdit = () => {
        this.setState({ editReview: true, currentReview: '' })
    }

    addReview = (usernameRefs, reviewRefs, actionType) => { // trigger when user submit review form

        let Url, RequestData, ResponseData, c = this

        switch (actionType) {
            case 'update':
                Url = `http://localhost:3000/api/movie/${this.props.match.params.id}/reviews`
                console.log(actionType)
                RequestData = { reviews: {
                    user: usernameRefs,
                    review: reviewRefs
                } }
                console.log(RequestData)
                break
            case 'delete':
                Url = `http://localhost:3000/api/movie/${this.props.match.params.id}/delete-user-review/${usernameRefs}`
                console.log(actionType)
                RequestData = { reviews: {
                    user: usernameRefs,
                    review: reviewRefs
                } }
                break
            case 'addNewMovie':
                Url = `http://localhost:3000/api/movie/${this.props.match.params.id}`
                console.log(actionType)
                RequestData = { id: c.props.match.params.id,
                    title: c.state.movie.title,
                    overview: c.state.movie.overview,
                    reviews: [
                        {
                            user: usernameRefs,
                            review: reviewRefs
                        }
                    ] }
                break
        }
        
        axios.post(Url, (RequestData))
            .then(function (response) {
                if (actionType === 'update') {
                    console.log(response)
                    console.log(c.props.match.params.id)
                    console.log(RequestData)
                    c.setState({
                        movie: {
                            ...c.state.movie,
                            reviews: response.data.reviews
                        },
                        currentUser: usernameRefs,
                        currentReview: reviewRefs,
                        editReview: false
                    })
                } else if (actionType === 'delete') {
                    console.log(response.data)
                    c.setState({
                        movie: {
                            ...c.state.movie,
                            reviews: response.data.reviews
                        },
                        currentUser: usernameRefs,
                        editReview: true
                    })
                } else {
                    c.setState({
                        movie: response.data,
                        loading: false,
                        currentReview: reviewRefs,
                        currentUser: usernameRefs,
                        editReview: false
                    })
                }
                console.log(usernameRefs)
                console.log(c.state.currentUser)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    componentWillMount() { // can't console.log any state here because component isn't mounted yet
        if (!this.props.location.locationState.currentUser) {
            console.log('props.location undefined')
          } else {
            console.log(this.props.location.locationState.currentUser)
            this.setState({ currentUser: this.props.location.locationState.currentUser })
          }
    }

    componentDidMount() {
        let c = this

        axios.get(`http://localhost:3000/api/movie/${this.props.match.params.id}`) // check if movie exist in local database..
            .then(function (response) {
                if (response.data) {
                    c.setState({ movie: response.data, loading: false })
                    console.log('request made from local db')
                    console.log(c.state.movie.reviews)
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
                c.setState({ movie: response.data, loading: false, externalApiCall: false, externalApiPost: true })
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

    isLogin() {
        if (this.state.currentUser) {
            return (
                <Login currentUser={this.state.currentUser} logOut={this.logOut} />
            )
        }
    }
     
    render () {
        return (
            <div className="App">
                {this.isLogin()}
                <Link 
                  to={{
                  pathname: `/`,
                  locationState: { currentUser: this.state.currentUser }}}>
                  Home
                </Link>
                {this.loading()}
                <ReviewBody paramsId={this.props.match.params.id} movie={this.state.movie} currentUser={this.state.currentUser} addReview={this.addReview} editReview={this.state.editReview} deleteReview={this.state.deleteReview} onEdit={this.onEdit} newMovie={this.state.externalApiPost} />
            </div>
        )
    }
}

export default GetMovie