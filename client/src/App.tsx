import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
// import Home from './pages/home/Home';
// import SignUpPage from './pages/auth/signUp/SignUpPage';
// import LoginPage from './pages/auth/login/LoginPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
// import NotificationPage from './pages/notification/NotificationPage';
// import ProfilePage from './pages/profille/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner';

import React, {Suspense, useEffect} from 'react';

import {IUser as User} from './types/user';

const Home = React.lazy(() => import('./pages/home/Home'));
const ProfilePage = React.lazy(() => import('./pages/profille/ProfilePage'));
const LoginPage = React.lazy(() => import('./pages/auth/login/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/signUp/SignUpPage'));
const NotificationPage = React.lazy(() => import('./pages/notification/NotificationPage'));


function App() {

   // Preload critical pages after the initial load
   useEffect(() => {
    import('./pages/home/Home');
  }, []);
  
  const { data:authUser , isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('api/auth/me');
        const data = await res.json();
        if(data.error) return null;
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return data as User;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          console.error('Unexpected error occurred');
        }
      }
    },
    retry: true,
  });

  if(isLoading){
    return (
            <div className='h-screen flex justify-center items-center'>
              <LoadingSpinner size='lg' />
            </div>
    )}

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}
      <Suspense fallback={<LoadingSpinner size='lg' />} >
        <Routes>
          <Route path ='/' element={ authUser? <Home />: <Navigate to='/login'/>} />
          <Route path='notifications' element={ authUser? <NotificationPage />: <Navigate to='/login'/>}/>
          <Route path ='/signup' element={ !authUser? <SignUpPage />: <Navigate to='/'/>}/>
          <Route path ='/login' element={ !authUser? <LoginPage />: <Navigate to='/'/>}/>
          <Route path ='/profile/:username' element={ authUser? <ProfilePage />: <Navigate to='/login'/>}/>
        </Routes>
      </Suspense>
      { authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App;
