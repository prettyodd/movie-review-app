import React from 'react'
import axios from 'axios'

const AddNewMovie = ( paramsId, movie, username, userReview, APIstate=f=>f ) => {
    let c = this

    return (
        axios.post(`http://localhost:3000/api/movie/${paramsId}`, {
            id: paramsId,
            title: movie.title,
            overview: movie.overview,
            reviews: [
                {
                    user: username,
                    review: userReview
                }
            ]
            })
            .then(function (response) {
                console.log('add new movie')
                console.log(response)
                console.log(paramsId)
                APIstate({
                    movie: response.data,
                    loading: false,
                    currentReview: userReview,
                    currentUser: username,
                    editReview: false
                })
                console.log(username)
            })
            .catch(function (error) {
                console.log(error)
            })
    )
}

export default AddNewMovie