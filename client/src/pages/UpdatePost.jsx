import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { editPost, getPosts, reset,  } from '../features/posts/postSlice'

function UpdatePost() {
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    title: '',
  })
  
  const {user} = useSelector((state) => state.auth)
  const {posts, isLoading, isError, message} = useSelector(
    (state) => state.posts
    )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPosts())
    return () => {
      dispatch(reset())
      setForm(posts.find(ob => ob._id === id))
    }
  }, [user, navigate, isError, message, dispatch])

  const changeForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    
    dispatch(editPost(form, id))
    setForm({
      title: ''
    })
    navigate('/')
  }

  // console.log(form, 'form')
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <h3>Update Post</h3>
          <label htmlFor='title'>Post Title</label>
          <br />
          <input
            type='text'
            name='title'
            id='text'
            value={form.title}
            onChange={(e) => changeForm(e)}
          />
          {/* <label htmlFor=""></label> */}
        </div>
        <div className='form-group'>
          <button className='' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdatePost
