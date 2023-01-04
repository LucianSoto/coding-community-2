import { useState, useEffect, } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
// import { }

function SearchUsers() {
  const navigate = useNavigate()
  
  const { users, isLoading, isError, message } = useSelector((state) => state.users)
  // use effect to get users
  if(isLoading) {
    return <Spinner/>
  }
  return (
    <>
      <div> 
        <h3 className='text-3xl'>User Search Results</h3>
        <div className='results'>
          {users ? users.map((user, i) => 
            <div key={i} className="cursor-pointer text-xl font-medium text-purple-500" >
              <Link to={`/profile/${user.id}`}>
              {user.username}</Link>
            </div>
          ) 
          :
            "No Users Found"
          }
        </div>
      </div>
    </>

  )
}

export default SearchUsers