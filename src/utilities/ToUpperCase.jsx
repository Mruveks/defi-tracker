import React from 'react'

const ToUpperCase = ({ word }) => {

  const capitalized = word.charAt(0).toUpperCase() + word.slice(1)

  return (
    <div>
      {capitalized}
    </div>
  )
}

export default ToUpperCase
