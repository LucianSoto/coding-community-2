import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { userPosts, reset } from '../features/users/usersSlice'
import { useParams, useNavigate } from 'react-router-dom'


function Profile() {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { user } = useSelector(state => state.user)
  const { users, isLoading, isError, message } = useSelector((state)=> state.users)

  useEffect(()=> {
      dispatch(userPosts(id))
      return () => {
        dispatch(reset())
      }
    
  }, [users])

  if(isLoading) {
    return <Spinner />
  }
  return (
    <div id='profile'>
      <h1>{id}</h1>
      <div id='posts'>
        posts
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Beriend</button>
    </div>
  )
}

export default Profile
