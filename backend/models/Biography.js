import mongoose from 'mongoose';

const biographySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  heroImage: { type: String, required: true },
  images: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Biography', biographySchema);
