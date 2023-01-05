import {useState, useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { userPosts, reset } from '../features/users/usersSlice'
import { useParams, useNavigate } from 'react-router-dom'
import PostItem from '../components/PostItem'
import axios from 'axios'

function Profile() {
  const mounted = useRef(false)
  const {id} = useParams()
  // console.log(id)
  const {username} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, isLoading, isError, message } = useSelector((state)=> state.users)

  // dispatch(userPosts(id))
  useEffect(() => {
    console.log('dispatching userposts')
    dispatch(userPosts(id))
    dispatch(reset())
  }, [])

  useEffect(() => {
      axios.get()
  })

  console.log((typeof users), 'posts')

  // console.log(users.map(post => post))
    
  // if(() {
  //   return <Spinner />
  // }
  return (
    <div id='profile ' className='mt-32 w-1/2'>
      <p className='text-5xl bold mb-5'>{username}</p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-10'

      >
        Beriend +
      </button>
      <div id='posts-container '>
        { users !== [] ? 
            users.map((post, i) => (
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
