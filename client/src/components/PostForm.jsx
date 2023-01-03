import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../features/posts/postSlice'

function GoalForm() {
  const [form, setForm] = useState({
    title: '',
  })

  const dispatch = useDispatch()

  const changeForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createPost(form))
    setForm({
      title: ''
    })
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <h3>Care to Share?</h3>
          <label htmlFor='title'>What's on your mind?</label>
          <br />
          <input
            type='text'
            name='title'
            id='text'
            value={FormData.title}
            onChange={(e) => changeForm(e)}
          />
          {/* <label htmlFor=""></label> */}
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Post
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
