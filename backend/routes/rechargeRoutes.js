const express = require('express');
const router = express.Router();
const { getRecharges, updateRechargeStatus } = require('../controllers/rechargeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getRecharges);
router.route('/:id/status').put(protect, admin, updateRechargeStatus);

module.exports = router;
