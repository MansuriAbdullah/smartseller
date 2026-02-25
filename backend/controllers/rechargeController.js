const Recharge = require('../models/Recharge');
const Seller = require('../models/Seller');
const asyncHandler = require('express-async-handler');

// @desc    Get all recharge requests
// @route   GET /api/recharges
// @access  Private/Admin
const getRecharges = asyncHandler(async (req, res) => {
    try {
        console.log('--- Fetching Recharge Data ---');
        const recharges = await Recharge.find({})
            .populate('seller', 'name shop_name')
            .sort({ created_at: -1 });

        console.log(`--- Found ${recharges.length} recharges ---`);
        if (recharges.length > 0) {
            console.log('Sample Recharge Item:', JSON.stringify(recharges[0], null, 2));
        }

        res.json({
            success: true,
            count: recharges.length,
            recharges
        });
    } catch (error) {
        console.error('ERROR in getRecharges:', error);
        res.status(500);
        throw new Error('Server Error: ' + error.message);
    }
});

// @desc    Update recharge status (Approve/Reject)
// @route   PUT /api/recharges/:id/status
// @access  Private/Admin
const updateRechargeStatus = asyncHandler(async (req, res) => {
    const { status, reason } = req.body;
    const recharge = await Recharge.findById(req.params.id);

    if (recharge) {
        recharge.status = status; // 1 = approved, 2 = rejected
        if (reason) recharge.reason = reason;

        const updatedRecharge = await recharge.save();
        res.json({
            success: true,
            recharge: updatedRecharge
        });
    } else {
        res.status(404);
        throw new Error('Recharge request not found');
    }
});

module.exports = {
    getRecharges,
    updateRechargeStatus
};
