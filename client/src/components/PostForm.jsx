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
            } // setProgress(progress) // alternate way of setting progress
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

    const updatedForm = {
      ...form,
      imgUrls,
    }
    delete updatedForm.images

    dispatch(createPost(updatedForm))
    // setForm({
    //   title: '',
    //   images: {},
    // })
  }

  return (
    <section className='form border shadow-xl rounded-xl p-10 w-1/2 flex flex-col items-center mb-10'>
      <form onSubmit={onSubmit} className='w-3/4'>
        <div className='form-group'>
          <p className='text-xl font-bolder' >Care to Share?</p >
          {/* <label htmlFor='title'>What's on your mind?</label> */}
          <br />
          <input
            type='text'
            name='title'
            id='text'
            className='form-control
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-00
              shadow-md
              rounded-full
              transition
              ease-in-out
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              mb-4'
            value={FormData.title}
            onChange={(e) => changeForm(e)}
          />
          {/* <label htmlFor=""></label> */}
        </div>
        <label htmlFor="imageUpload" className='text-gray-400'>Up to 3 mages 📷</label>
        <br />
        {/* <p className="images-info">Up to 3 images</p> */}
        <input 
          className='
           inputFile
          //  cursor-pointer
          '
          type="file" 
          id='images'
          onChange={changeForm}
          max='3'
          accept='.jpg,.png,.jpeg'
          multiple
          required
        />
        <div className='form-group flex justify-center mt-5'>
          <button className='bg-blue-500 hover:bg-blue-700 w-1/4 text-white font-bold py-2 px-4 rounded-full'>
            Post
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostForm
