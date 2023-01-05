import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useState } from 'react'
import { searchUsers, reset as resetPostSlice } from '../features/users/usersSlice'
// do I need reset for post slice?????

function Nav() {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const submitSearch = (text) => {
    if(text !== '') {
    dispatch(searchUsers(text))
    setSearchText('')
    navigate(`/search/${text}`)
    dispatch(resetPostSlice())
    } else {
      alert('search is empty')
    }
  }

  return (
    <header className='header bg-white px-2 sm:px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 ... fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600  flex justify-between pl-4 pr-10'>
      <div className='pl-4 logo text-3xl font-semibold whitespace-nowrap dark:text-white'>
        <Link to='/'>Coding Community</Link>
      </div>
      <div className="search">

        <input type="text" 
          className="
          form-control
          block
          w-60
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
          mr-20
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          placeholder=' Search Users by Full Name'
          name="search"
          value={searchText}
          onChange={(e)=> setSearchText(prevState => e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? submitSearch(searchText)
          : null}
        />
      </div>
      <div>
        {user ? (
          
            <button className='text-2xl pr-10 font-semibold text-white' onClick={onLogout}>
              Logout
            </button>
          
        ) : (
          <>
            <Link className='text-2xl pr-10 font-semibold text-white' to='/login'>
              Login
            </Link>
            <Link className='text-2xl pr-10 font-semibold text-white' to='/register'>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Nav