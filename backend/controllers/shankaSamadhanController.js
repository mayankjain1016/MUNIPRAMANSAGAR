import ShankaSamadhan, { ShankaSamadhanClip } from '../models/ShankaSamadhan.js';

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await ShankaSamadhan.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get home page questions (limited)
export const getHomeQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const questions = await ShankaSamadhan.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('question slug');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get popular questions
export const getPopularQuestions = async (req, res) => {
  try {
    const questions = await ShankaSamadhan.find({ isPublished: true, isPopular: true })
      .sort({ views: -1 })
      .limit(10);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await ShankaSamadhan.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    question.views += 1;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get question by slug
export const getQuestionBySlug = async (req, res) => {
  try {
    const question = await ShankaSamadhan.findOne({ slug: req.params.slug });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    question.views += 1;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search questions
export const searchQuestions = async (req, res) => {
  try {
    const { q } = req.query;
    const questions = await ShankaSamadhan.find({
      isPublished: true,
      $or: [
        { question: { $regex: q, $options: 'i' } },
        { answer: { $regex: q, $options: 'i' } }
      ]
    }).limit(20);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create question
export const createQuestion = async (req, res) => {
  try {
    const question = new ShankaSamadhan(req.body);
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const question = await ShankaSamadhan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    await ShankaSamadhan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== CLIPS MANAGEMENT =====

// Get all clips
export const getAllClips = async (req, res) => {
  try {
    const clips = await ShankaSamadhanClip.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(clips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get popular clips
export const getPopularClips = async (req, res) => {
  try {
    const clips = await ShankaSamadhanClip.find({ isPublished: true, isPopular: true })
      .sort({ views: -1 })
      .limit(10);
    res.json(clips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get clip by ID
export const getClipById = async (req, res) => {
  try {
    const clip = await ShankaSamadhanClip.findById(req.params.id);
    if (!clip) {
      return res.status(404).json({ message: 'Clip not found' });
    }
    clip.views += 1;
    await clip.save();
    res.json(clip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create clip
export const createClip = async (req, res) => {
  try {
    const clip = new ShankaSamadhanClip(req.body);
    const newClip = await clip.save();
    res.status(201).json(newClip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update clip
export const updateClip = async (req, res) => {
  try {
    const clip = await ShankaSamadhanClip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(clip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete clip
export const deleteClip = async (req, res) => {
  try {
    await ShankaSamadhanClip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Clip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
