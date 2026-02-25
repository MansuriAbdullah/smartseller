const express = require('express');
const router = express.Router();
const { getPackages, purchasePackage } = require('../controllers/packageController');

router.route('/').get(getPackages);
router.route('/purchase').post(purchasePackage);

module.exports = router;
