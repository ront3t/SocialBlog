import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import SignUpPage from './pages/auth/signUp/SignUpPage';
import LoginPage from './pages/auth/login/LoginPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profille/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {

  const { data:authUser , isLoading, error, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('api/auth/me');
        const data = await res.json();
        if(data.error) return null;
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return data;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          console.error('Unexpected error occurred');
        }
      }
    },
    retry: false,
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
      <Routes>
        <Route path ='/' element={ authUser? <Home />: <Navigate to='/login'/>} />
        <Route path='notifications' element={ authUser? <NotificationPage />: <Navigate to='/login'/>}/>
        <Route path ='/signup' element={ !authUser? <SignUpPage />: <Navigate to='/'/>}/>
        <Route path ='/login' element={ !authUser? <LoginPage />: <Navigate to='/'/>}/>
        <Route path ='/profile/:username' element={ authUser?<ProfilePage />: <Navigate to='/login'/>}/>
      </Routes>
      { authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App;
