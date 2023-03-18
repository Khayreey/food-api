"use strict";

var mongoose = require('mongoose');

var favoriteDishesSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'you must provide user']
  },
  disheInformation: {
    type: mongoose.Types.ObjectId,
    ref: 'Dishes',
    required: [true, "you must provide dishe"]
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Favorite', favoriteDishesSchema);