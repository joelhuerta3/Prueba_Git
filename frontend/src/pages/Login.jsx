import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => { e.preventDefault(); login(form); };

  return (
    <form onSubmit={onSubmit}>
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <button>Entrar</button>
    </form>
  );
}