import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function Recipe() {
  const { id } = useParams();
  const [r, setR] = useState(null);

  useEffect(() => {
    api.get(`/recipes/${id}`).then(res => setR(res.data));
  }, [id]);

  if (!r) return <p>Cargando...</p>;

  return (
    <article>
      <h1>{r.title}</h1>
      <img src={r.imageUrl} alt={r.title} width={300} />
      <h2>Ingredientes</h2>
      <ul>{r.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      <h2>Pasos</h2>
      <ol>{r.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
      <p>Calorías: {r.calories}</p>
      <h2>Historia</h2>
      <p>{r.history}</p>
    </article>
  );
}