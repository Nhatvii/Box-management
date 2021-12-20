const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  storageName: {
    type: String,
    required: true,
  },
  startCount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  storageSize: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  expriredDate: {
    type: String,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Storage', StorageSchema);