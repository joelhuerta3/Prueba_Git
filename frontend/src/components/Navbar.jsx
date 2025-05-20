import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/new">Nueva receta</Link>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <>  
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </>
      )}
    </nav>
  );
}