import LiveVideo from '../models/LiveVideo.js';

export const getLiveStatus = async (req, res) => {
  try {
    let liveVideo = await LiveVideo.findOne();
    if (!liveVideo) {
      liveVideo = await LiveVideo.create({ isLive: false, videoUrl: '' });
    }
    res.json(liveVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching live status', error: error.message });
  }
};

export const updateLiveStatus = async (req, res) => {
  try {
    const { isLive, videoUrl } = req.body;
    let liveVideo = await LiveVideo.findOne();
    
    if (!liveVideo) {
      liveVideo = await LiveVideo.create({ isLive, videoUrl });
    } else {
      liveVideo.isLive = isLive;
      liveVideo.videoUrl = videoUrl;
      await liveVideo.save();
    }
    
    res.json(liveVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating live status', error: error.message });
  }
};
