import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Register from './pages/Register';
import NewRecipe from './pages/NewRecipe';
//import Admin from './pages/Admin';

export default function App() {
  return (
    <>  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute role="user" />}>  
          <Route path="/new" element={<NewRecipe />} />
        </Route>
        <Route element={<ProtectedRoute role="admin" />}>  
         
        </Route>
      </Routes>
    </>
  );
}