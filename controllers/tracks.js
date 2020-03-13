const Track = require('../models/Track');

exports.getTracks = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tracks = await Track.find({ userId });
        res.status(200).json({
            success: true,
            data: tracks
        });
    } catch (error) {
        res.status(400).json({
            error: 'Server error'
        });
    }
};

exports.postTrack = async (req, res, next) => {
    try {
        const { name, locations } = req.body;
        const userId = req.user._id;
        if (!name || !locations) {
            return res.status(400).json({
                error: 'You must provide a name and locations'
            });
        }

        const track = await Track.create({ name, locations, userId });
        res.status(200).json({
            success: true,
            data: track
        });
    } catch (error) {
        res.status(400).json({
            error: 'Server error'
        });
    }
};
