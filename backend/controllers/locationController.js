import Location from '../models/Location.js';

// Get location (single)
export const getLocation = async (req, res) => {
  try {
    let location = await Location.findOne();
    if (!location) {
      location = await Location.create({
        address: 'Gunayatan, Kundkund Marg, Madhuban, Jharkhand 825329',
        addressEnglish: 'Gunayatan, Kundkund Marg, Madhuban, Jharkhand 825329'
      });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update location
export const updateLocation = async (req, res) => {
  try {
    let location = await Location.findOne();
    if (!location) {
      location = await Location.create(req.body);
    } else {
      location = await Location.findByIdAndUpdate(
        location._id,
        req.body,
        { new: true }
      );
    }
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
