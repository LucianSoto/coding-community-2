import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostForm from '../components/PostForm'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'
import { getPosts, reset } from '../features/posts/postSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getPosts())
      return () => {
        dispatch(reset())
      }
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading mt-24'>
        <h1 className='font-bold text-4xl mb-10'>Welcome {user && user.username}</h1>
      </section>

      <PostForm />

      {/* <section className='content'> */}
        {posts.length > 0 ? (
          <div className='w-4/5 flex flex-col items-center'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className='text-3xl bolder'>Post something for the world to see!</p>
        )}
      {/* </section> */}
    </>
  )
}

export default Dashboard
