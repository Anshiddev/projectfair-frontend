
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Reg from './pages/Reg'
import Projects from './pages/Projects'
import { Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'
import './bootstrap.min.css'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { tokenAuthContext } from './context_api/AuthContext'
import Login from './pages/Login'

function App() {
  const {authStatus,setAuthStatus} = useContext(tokenAuthContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/dashboard' element={authStatus?<Dashboard />:<Landing />} />
      <Route path='/reg' element={<Reg />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/projects' element={authStatus?<Projects />:<Landing />} />
    </Routes>
    <Footer />
    <ToastContainer />
    </>
  )
}

export default App
