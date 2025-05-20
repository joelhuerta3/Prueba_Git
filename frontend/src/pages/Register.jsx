import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register } = useContext(AuthContext);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => { e.preventDefault(); register(form); };

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <button>Registrar</button>
    </form>
  );
}
