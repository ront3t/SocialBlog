import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import UserProfile from './Pages/UserProfile';
import ArticlePage from './Pages/ArticlePage';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/profile" Component={UserProfile} />
        <Route path="/article/:id" Component={ArticlePage} />
      </Routes>
    </Router>
  );
};

export default App;