import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { useDispatch } from 'react-redux';
import { me } from './features/me';
import { setUserData } from './redux/userSlice';
import ProjectPage from './pages/ProjectPage';
import Plan from './pages/Plan';

function App() {
  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const data = await me()
      dispatch(setUserData(data))
      setAuthChecked(true)
    }
    fetch()
  }, [])

  if (!authChecked) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#07070c]">
        <div className="animate-spin h-8 w-8 border-2 border-white/20 border-t-white rounded-full" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App