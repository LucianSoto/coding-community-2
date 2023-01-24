import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { userPosts, reset } from '../features/users/usersSlice'
import { useParams, useNavigate } from 'react-router-dom'
import PostItem from '../components/PostItem'
import axios from 'axios'

function Profile() {
  const mounted = useRef(false)
  const {id} = useParams()
  const {username} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { users, isLoading, isError, message } = useSelector((state)=> state.users)

  useEffect(() => {
    if (mounted.current === false) {
      if(isError) {
        console.log(message)
      }
      if(!user) {
        navigate('/login')
      } else {
        console.log('dispatching userposts', id)
        dispatch(userPosts(id))
        return () => {
          dispatch(reset())
        }
      }
    } else {
      // mounted.current = true
    }
  }, [])

  if(isLoading) {
    return <Spinner />
  }
  return (
    <div id='profile ' className='mt-32 w-1/2'>
      <p className='text-5xl bold mb-5'>{username}</p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-10'
      >
        Beriend +
      </button>
      <div id='posts-container '>
        { users !== [] ? 

            users.posts.map((post, i) => (
              <PostItem key={post._id} post={post} />
            ))
            :
            null
        }
        {
          // dummydata
        }
      </div>
    </div>
  )
}

export default Profile
