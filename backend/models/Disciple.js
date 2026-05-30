import mongoose from 'mongoose';

const discipleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['शिष्य'],
    default: 'शिष्य',
    required: true 
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Disciple', discipleSchema);
