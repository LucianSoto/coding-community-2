import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Home</Link>
      </div>
      <ul>
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
      </ul>
    </header>
  )
}

export default Nav