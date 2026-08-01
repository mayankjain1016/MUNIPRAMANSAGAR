import mongoose from 'mongoose';

const sahityaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'आचार्य श्री निर्भय सागर जी' },
  description: { type: String, default: '' },
  coverImage: { type: String, required: true },
  pdfFile: { type: String },
  pdfFiles: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Sahitya', sahityaSchema);
