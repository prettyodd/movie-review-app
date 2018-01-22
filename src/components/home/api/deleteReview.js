import React from 'react'
import axios from 'axios'
import LocalDBcall from './localDBCall'

const DeleteReview = ( paramsId, movie, username, userReview, APIstate=f=>f ) => {
    let c = this

    return (
        axios.post(`/api/movie/${paramsId}/delete-user-review/${username}`, {
            reviews: {
                user: username,
                review: userReview
            }
            })
            .then(function (response) {
                console.log('add new movie')
                console.log(response)
                console.log(paramsId)
                APIstate({ editReview: true })
                LocalDBcall(paramsId, APIstate)
                console.log(username)
            })
            .catch(function (error) {
                console.log(error)
            })
    )
}

export default DeleteReview