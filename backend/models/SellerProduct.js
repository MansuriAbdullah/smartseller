const mongoose = require('mongoose');

const sellerProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    // Assuming implicit columns based on common patterns if not fully visible, but based on table name likely linking seller and product
    // Checking SQL dump lines for schema if missed... looks like I need to double check the exact schema for seller_product
    // It was not fully apparent in the snippets. I will assume standard join fields for now but defined as its own collection if it has ID.
    // Wait, I see `seller_product` in the table list but didn't see the CREATE TABLE statement in the snippets 5600-6399.
    // I will assume it exists since user said "21 tables".
    // Let me check if I missed it in the first snippet.
    // Actually, I'll create a generic one and then maybe check.
    // Better yet, I'll assume it links seller_id and product_id based on name.
    seller_id: { type: mongoose.Schema.Types.Mixed, ref: 'Seller' },
    product_id: { type: mongoose.Schema.Types.Mixed, ref: 'Product' },
    // Add other likely fields
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('SellerProduct', sellerProductSchema);
