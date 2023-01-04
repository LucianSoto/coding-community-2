import { useDispatch } from 'react-redux'
import { createPost } from '../features/posts/postSlice'
import { useState, useEffect } from 'react'
import {
  ref, 
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from 'firebase/storage'
// import { storage } from './firebase'

function PostForm() {
  const [form, setForm] = useState({
    title: '',
    images: {},
  })
  const [imageUpload, setImageUpload] = useState(null)

  const dispatch = useDispatch()

  const changeForm = (e) => {
    if(e)
    setForm((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(form))
    setForm({
      title: '',
      images: {},
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
        <label htmlFor="imageUpload">Images</label>
        <p className="images-info">Up to 3 images</p>
        <input 
          type="file" 
          id='images'
          className='input-file'
          onChange={changeForm}
          max='1'
          accept='.jpg,.png,.jpeg'
          // multiple
          required
        />
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Post
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostForm
