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
      <div className='w-1/2 p-10 flex flex-col items-center'> 
        <h3 className='text-3xl mt-32 mb-10 font-bold'>User Search Results</h3>
        <div className='results w-3/4 h-full rounded-xl  border shadow-xl '>
          {users ? users.map((user, i) => 
            <div key={i} className="cursor-pointer text-xl font-medium text-purple-600 p-5 border-b w-full " >
              <Link to={`/profile/${user.id}/${user.username}`}>
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