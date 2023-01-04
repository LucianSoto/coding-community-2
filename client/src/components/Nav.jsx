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
    <header className='header'>
      <div className='logo'>
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