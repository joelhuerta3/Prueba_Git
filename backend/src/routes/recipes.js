const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const Recipe = require('../models/Recipe');

// Lista pública
router.get('/', async (req, res) => {
  const recipes = await Recipe.find().populate('author', 'name');
  res.json(recipes);
});

// Detalle
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('author', 'name');
  res.json(recipe);
});

// Crear (user o admin)
router.post('/', auth, permit('user','admin'), async (req, res) => {
  const newRecipe = new Recipe({ ...req.body, author: req.user._id });
  const saved = await newRecipe.save();
  res.json(saved);
});

// Editar (autor ó admin)
router.put('/:id', auth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'No encontrada' });
  if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Sin permisos' });
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Eliminar (autor ó admin)
router.delete('/:id', auth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'No encontrada' });
  if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Sin permisos' });
  await recipe.remove();
  res.json({ message: 'Eliminada' });
});

module.exports = router;