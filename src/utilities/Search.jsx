import React, { useState } from 'react'
import axios from 'axios';

const Search = () => {

  const [search, setSearch] = useState([]);

  const handleSearch = async () => {
    if (search) {
      axios.get(`https://api.llama.fi/protocol/${search}`)
        .then((res) => {
          console.log('co jest')
        })
      .catch(err => console.log(err))
    }
  };
  return (
    <div className="flex">
      <form className="h-10">
        <input placeholder="search..." value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text">
        
        </input>
        <button onClick={handleSearch} className='h-full w-60 bg-gray-400'>
          Search
        </button>
      </form>
    </div>
  )
}

export default Search
