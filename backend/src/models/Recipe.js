const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  title:       { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps:       [{ type: String, required: true }],
  imageUrl:    { type: String, required: true },
  calories:    { type: Number, required: true },
  history:     { type: String, required: true },
  author:      { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = model('Recipe', recipeSchema);