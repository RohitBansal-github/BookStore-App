import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import ProtectedRoute from './components/ProtectedRoute';
import CourseDetails from './components/CourseDetails';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Home from './home/Home.jsx';
import Signup from './components/Signup.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import Dashboard from './components/Dashboard.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import Navbar from './components/Navbar.jsx';
import AllBooks from './pages/AllBooks.jsx';
import SearchBooks from './pages/SearchBooks.jsx';
import FreeBookSummary from './pages/FreeBookSummary.jsx';
import Wishlist from './components/Wishlist.jsx';
import Login from './components/Login.jsx';
import LoginRequired from './pages/LoginRequired.jsx';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<SearchBooks />} />
              
              <Route path="/allbooks" element={<ProtectedRoute><AllBooks /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/login-required" element={<LoginRequired />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster position="bottom-right" />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;