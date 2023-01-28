import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Avax = ({ protocol }) => {


  useEffect(() => {
    axios.get(`https://api.llama.fi/protocol/${protocol}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default Avax
