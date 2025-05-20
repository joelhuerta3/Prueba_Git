import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <div>
      <img src={recipe.imageUrl} alt={recipe.title} width={200} />
      <h3>{recipe.title}</h3>
      <p>Autor: {recipe.author.name}</p>
      <Link to={`/recipe/${recipe._id}`}>Ver</Link>
    </div>
  );
}