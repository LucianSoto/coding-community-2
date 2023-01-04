import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/Nav'
import UpdatePost from './pages/UpdatePost'
import SearchUsers from './pages/SearchUsers'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Nav />
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/update_post/:id' element={<UpdatePost/>} />
            <Route path='/search/:user' element={<SearchUsers />} />
            <Route path="/profile/:id" element={<Profile/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
