import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function NewRecipe() {
  const [form, setForm] = useState({ title: '', ingredients: [''], steps: [''], imageUrl: '', calories: '', history: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/recipes/${id}`).then(r => setForm(r.data));
  }, [id]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onArrayChange = (field, idx, value) => {
    const arr = [...form[field]];
    arr[idx] = value;
    setForm({ ...form, [field]: arr });
  };
  const addField = field => setForm({ ...form, [field]: [...form[field], ''] });

  const onSubmit = e => {
    e.preventDefault();
    const fn = id ? api.put : api.post;
    fn(id ? `/recipes/${id}` : '/recipes', form).then(() => navigate('/'));
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="title" placeholder="Título" value={form.title} onChange={onChange} />
      <h3>Ingredientes</h3>
      {form.ingredients.map((i, idx) => (
        <input key={idx} value={i} onChange={e => onArrayChange('ingredients', idx, e.target.value)} />
      ))}
          <button type="button" onClick={() => addField('ingredients')}>+ Ingrediente</button>
        <h3>Pasos</h3>
        {form.steps.map((s, idx) => (
          <input key={idx} value={s} onChange={e => onArrayChange('steps', idx, e.target.value)} />
        ))}
          <button type="button" onClick={() => addField('steps')}>+ Paso</button>
        <button type="submit">Guardar Receta</button>
      </form>);
}