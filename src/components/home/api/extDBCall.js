import React from 'react'
import axios from 'axios'

const ExtAPIcall = (paramsId, APIstate=f=>f) => {
    
    let c = this

    return (
        axios.get(`https://api.themoviedb.org/3/movie/${paramsId}?api_key=8628080f9f188525f46d4b3f501f92ef&language=en-US`)
            .then(function (response) {
                APIstate({ movie: response.data, loading: false })
                console.log('request made from external db')
            })
            .catch(function (error) {
                console.log(error)
            })
    )
}

export default ExtAPIcall