import React from 'react'
import axios from 'axios'

const UpdateReview = ( paramsId, movie, username, userReview, APIstate=f=>f ) => {
    let c = this

    return (
        axios.post(`/api/movie/${paramsId}/reviews`, {
            reviews: {
                user: username,
                review: userReview
            }
            })
            .then(function (response) {
                console.log('add new movie')
                console.log(response)
                console.log(paramsId)
                console.log(movie)
                APIstate({
                    movie: {
                        ...movie,
                        reviews: response.data.reviews
                    },
                    currentUser: username,
                    currentReview: userReview,
                    editReview: false
                })
                console.log(movie)
                console.log(username)
            })
            .catch(function (error) {
                console.log(error)
            })
    )
}

export default UpdateReview