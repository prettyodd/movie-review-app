import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieHeader from './movieHeader'
import ReviewBody from './reviewBody'
import Login from './login'
import LocalDBCall from './api/localDBCall'
import styles from '../../../style/index.module.css'

class GetMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          movie: { id: '', title: '', overview: '', poster_path: '', reviews: [] },
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
            console.log('props.location undefinedd!!') :
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
            
            <div style={{ margin: '3rem auto', maxWidth: 750 }}>
                <div style={{ display: 'flex' }}>
                    <Link 
                      to={{
                      pathname: `/`,
                      locationState: { currentUser: this.state.currentUser }}}>
                      <strong>HOME</strong>
                    </Link>
                    <span style={{ marginLeft: 'auto', order: 2 }} >{this.isLogin()}</span>
                </div>
                {this.loading()}
                <ReviewBody 
                    paramsId={this.props.match.params.id}
                    movie={this.state.movie}
                    currentUser={this.state.currentUser}
                    editReview={this.state.editReview}
                    onEdit={this.onEdit}
                    APIstate={this.APIstate}
                />
            </div>
        )
    }
}

export default GetMovie