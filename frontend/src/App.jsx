import React, { useEffect, useRef } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SettingPage from './pages/SettingPage';
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useChatStore } from './store/useChatStore';
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';



const App = () => {

  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  const prevUserRef = useRef(null);

  useEffect(()=>{

    checkAuth();
  },[checkAuth])

  useEffect(() => {
    const currentUserId = authUser?._id;
    if (prevUserRef.current !== currentUserId) {
      useChatStore.getState().resetChat();
      prevUserRef.current = currentUserId;
    }
  }, [authUser?._id]);

  // console.log(authUser)

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }


  return (
    <div>

      <Navbar/>
     <Routes>
  <Route
    path="/"
    element={authUser ? <Home /> : <Navigate to="/login" />}
  />

  <Route
    path="/login"
    element={!authUser ? <Login /> : <Navigate to="/" />}
  />

  <Route
    path="/signup"
    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
  />

  <Route path="/setting" element={<SettingPage />} />

  <Route
    path="/profile"
    element={authUser ? <Profile /> : <Navigate to="/login" />}
  />
</Routes>

<Toaster/>
    </div>
  )
}

export default App