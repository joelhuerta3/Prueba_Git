const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const User = require('../models/User');

// Solo admin
outer.use(auth, permit('admin'));

// Lista usuarios
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
// Cambiar rol
router.put('/:id/role', async (req, res) => {
  const { role } = req.body;
  const u = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  res.json(u);
});
// Eliminar usuario
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
});

module.exports = router;