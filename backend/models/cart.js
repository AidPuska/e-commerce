const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'eUser'
    },
    products: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        price: Number,
        quantity: {
            type: Number,
            default: 1,
            min: 1
        },
        image: String
    }],
    /*  total: {
         default: 0,
         type: Number,
         required: true
     } */
})

module.exports = mongoose.model('Cart', cartSchema)