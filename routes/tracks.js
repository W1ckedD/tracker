const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { getTracks, postTrack } = require('../controllers/tracks');

router.use(requireAuth);

router.get('/tracks', getTracks);
router.post('/tracks', postTrack);

module.exports = router;
