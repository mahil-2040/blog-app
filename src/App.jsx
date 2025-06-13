import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <div className="p-10 text-center">Checking session...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <Header />
      <main className="flex-1">
        todo: <Outlet />
      </main>
      <Footer />
    </div>
  );

}

export default App
