const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  partner: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Cloud Services', 'Marketing', 'Analytics', 'Productivity', 'Development']
  },
  discount: {
    type: String,
    required: true
  },

  eligibility: {
    type: String,
    default: 'All users'
  },
  
  
});

module.exports = mongoose.model('Deal', dealSchema);
