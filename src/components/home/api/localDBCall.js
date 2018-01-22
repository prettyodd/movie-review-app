import React from 'react'
import axios from 'axios'
import ExtDBcall from './extDBCall'

const LocalDBCall = (paramsId, APIstate=f=>f) => {
    let c = this
    return (
        axios.get(`/api/movie/${paramsId}`) // check if movie exist in local database..
        .then(function (response) {
            if (response.data) {
                APIstate({ movie: response.data, loading: false })
                console.log('request made from local db')
            } else {
                ExtDBcall(paramsId, APIstate)
            }
        })
        .catch(function (error) {
            console.log(error)
            ExtDBcall(paramsId, APIstate)
        })
    )
}

export default LocalDBCall