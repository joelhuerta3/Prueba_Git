import { useEffect, useState } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('/recipes').then(res => setRecipes(res.data));
  }, []);

  return (
    <div>
      <h1>Recetas de Tlaxcala</h1>

      <div>
        {recipes.map(r => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </div>
  );
}

