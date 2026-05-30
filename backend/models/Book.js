import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'आचार्य श्री निर्भय सागर जी' },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  pdfFile: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
