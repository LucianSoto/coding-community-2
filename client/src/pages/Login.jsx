import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading mt-40 '>
        <h1 className='font-bold text-5xl mb-10'>Coding Community</h1>
      </section>

      <section className='form border-2 border-solid shadow-md rounded-xl p-10 mb-8'>
        <p className='font-bolder text-3xl mb-10'>Login and share your coding experiences</p>
        <form onSubmit={onSubmit} className='flex flex-col items-center w-full'>
        
            <input
              type='email'
              className='form-control
              form-control
              block
              w-3/4
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded-full
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              mb-4
              shadow-md'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          
          
            <input
              type='password'
              className='form-control
              form-control
              block
              w-3/4
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded-full
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              mb-4
              shadow-md'              
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />


          <div className='form-group'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
              Submit
            </button>
          </div>
        </form>
      </section>

      <section  className='flex flex-col items-center w-full '>
        <p className='mb-5' >Don't have an account?</p>
        <button className='text-2xl text-indigo-500 font-bolder'>
          <Link to={'/register'} >Register</Link>
        </button>
      </section>
    </>
  )
}

export default Login
