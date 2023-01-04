import { useDispatch } from 'react-redux'
import { createPost } from '../features/posts/postSlice'
import { useState, useEffect } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
// Uploads data to this object's location. The upload can be paused and resumed, and exposes progress updates.
import {storage} from '../firebase'
import { v4 as uuidv4 } from 'uuid'

function PostForm() {
  const [form, setForm] = useState({
    title: '',
    images: {},
  })
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  // const [progress, setProgress] = useState(0)
  const dispatch = useDispatch()

  const changeForm = (e) => {
    if(e.target.files) {
      setForm((prevState) => ({
        ...prevState,
        images: e.target.files
      })
      )
    }
    setForm((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        // console.log(image, 'in Store image', (typeof image))
        const fileName = `${image.name}-${uuidv4()}`
        // must call uuidv4() function for it to actually make the id's
        const storageRef = ref(storage, 'images/' + fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
            //setProgress(progress) // another way to set progress
          },
          (error) => {
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all(
      [...form.images].map((image) => storeImage(image))
    ).catch(() => {
      return
    })
    console.log(imgUrls,'image urls')
  }

  console.log(form.images)
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
          max='3'
          accept='.jpg,.png,.jpeg'
          multiple
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
