import React from 'react'
import axios from 'axios'

const ExtAPIcall = (paramsId, APIstate=f=>f) => {
    
    let c = this

    return (
        axios.get(`https://api.themoviedb.org/3/movie/${paramsId}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`) // Get data from external database
            .then(function (response) {
                APIstate({ movie: response.data, loading: false, externalApiCall: false, externalApiPost: true })
                console.log('request made from external db')
            })
            .catch(function (error) {
                console.log(error)
            })
    )
}

export default ExtAPIcall