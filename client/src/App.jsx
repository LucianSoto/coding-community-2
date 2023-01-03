import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/Nav'
import UpdatePost from './pages/UpdatePost'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Nav />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/update_post/:id' element={<UpdatePost/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
