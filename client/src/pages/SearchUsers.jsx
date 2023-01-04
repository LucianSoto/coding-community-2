import { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
// import { }

function SearchUsers() {
  const navigate = useNavigate()
  
  const { users, isLoading, isError, message } = useSelector((state) => state.users)
  console.log(users)

  // use effect to get users
  return (
    <>
      <div> 
        <h3>User Search Results</h3>
        <div className='results'>
          {users ? users.map((user, i) => 
            <div key={i} className="">{user.username}</div>
          ) 
          :
            <Spinner />
          }
        </div>
      </div>
    </>

  )
}

export default SearchUsers