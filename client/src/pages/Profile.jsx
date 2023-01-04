import {useState, useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { userPosts, reset } from '../features/users/usersSlice'
import { useParams, useNavigate } from 'react-router-dom'


function Profile() {
  const mounted = useRef(false)
  const {id} = useParams()
  console.log(id)
  const {username} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, isLoading, isError, message } = useSelector((state)=> state.users)

  useEffect(() => {
    // console.log('in useEffect')
    if(mounted.current === false) {
      dispatch(userPosts(id))
      dispatch(reset())
      mounted.current = true
    }
      // if (isError) {
      //   console.log(message)
      // }
  
      // if (Array.isArray(users) === false) {
      //   navigate('/login')
      // } else {
      //   return () => {
      //   }
      // }
  }, [])

  console.log(users, 'posts')

  console.log(users.map(post => post))
    
  if(isLoading) {
    return <Spinner />
  }
  return (
    <div id='profile'>
      <h1>{username}</h1>
      <div id='posts-container'>
        { users ? 
            users.map((post, i) => (
              <div className="single-post" key={i}>
                <p className="posttitle">{post.title}</p>
                { post.imgUrls ?
                  post.imgUrls.map((img, i) => (
                    <img src={img} />
                    // console.log(img)
                  ))
                  :
                  null
                }    
              </div>
            ))
            :
            null
        }
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Beriend</button>
    </div>
  )
}

export default Profile
