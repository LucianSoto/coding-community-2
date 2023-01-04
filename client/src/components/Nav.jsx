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
    <header className='header bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 '>
      <div className='logo '>
        <Link to='/'>Home</Link>
      </div>
      <div className="search">
        <input type="text" 
          placeholder='Enter Full Name'
          name="search"
          value={searchText}
          onChange={(e)=> setSearchText(prevState => e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? submitSearch(searchText)
          : null}
        />
      </div>
      <div>
        {user ? (
          
            <button className='btn' onClick={onLogout}>
              Logout
            </button>
          
        ) : (
          <>
            <Link to='/login'>
              Login
            </Link>
            <Link to='/register'>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Nav