import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieHeader from './movieHeader'
import ReviewBody from './reviewBody'
import Login from './login'
import LocalDBCall from './api/localDBCall'

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

    APIstate = (data) => {
        console.log(data)
        this.setState(data)
    }

    componentWillMount() { // can't console.log any state here because component isn't mounted yet
        (!this.props.location.locationState.currentUser) ?
            console.log('props.location undefined') :
            console.log(this.props.location.locationState.currentUser)
            this.setState({ currentUser: this.props.location.locationState.currentUser })
    }

    componentDidMount() {
        LocalDBCall(this.props.match.params.id, this.APIstate)
    }

    loading() {
        return (this.state.loading) ?
               (<h2>Loading...</h2>) :
               (<MovieHeader movie={this.state.movie} />)
    }

    isLogin() {
        return (this.state.currentUser) ?
               (<Login currentUser={this.state.currentUser} logOut={this.logOut} />) :
                null
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
                <ReviewBody 
                    paramsId={this.props.match.params.id}
                    movie={this.state.movie}
                    currentUser={this.state.currentUser}
                    editReview={this.state.editReview}
                    deleteReview={this.state.deleteReview}
                    onEdit={this.onEdit}
                    newMovie={this.state.externalApiPost}
                    APIstate={this.APIstate}
                />
            </div>
        )
    }
}

export default GetMovie