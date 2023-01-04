import {useState, useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { userPosts, reset } from '../features/users/usersSlice'
import { useParams, useNavigate } from 'react-router-dom'


function Profile() {
  const mounted = useRef(false)
  const {id} = useParams()
  const {username} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, isLoading, isError, message } = useSelector((state)=> state.users)

  useEffect(() => {
    if(mounted.current === false) {
      if (isError) {
        console.log(message)
      }
  
      if (!users) {
        navigate('/login')
      } else {
        dispatch(userPosts(id))
        return () => {
          dispatch(reset())
        }
      }
      mounted = true
    }
  }, [])

  console.log(users)
    
  if(isLoading) {
    return <Spinner />
  }
  return (
    <div id='profile'>
      <h1>{username}</h1>
      <div id='posts-container'>
        { users &&
            users[0].map((post, i) => (
              <div className="single-post" key={i}>
                {post.title}
              </div>)
            )
        }
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Beriend</button>
    </div>
  )
}

export default Profile
