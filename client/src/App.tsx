import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import SignUpPage from './pages/auth/signUp/SignUpPage';
import LoginPage from './pages/auth/login/LoginPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profille/ProfilePage';

function App() {

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar />
      <Routes>
        <Route path ='/' Component={Home}/>
        <Route path='notifications' Component={NotificationPage}/>
        <Route path ='/signup' Component={SignUpPage}/>
        <Route path ='/login' Component={LoginPage}/>
        <Route path ='/profile/:username' Component={ProfilePage}/>
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App;
