var mongoose = require('mongoose');
var shoppingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: 'Name cannot be blank!'
    },
    quantity: {
        type: Number, 
        default: 1
    },
    price: {
        type: Number,
        default: '0.00'
    },
    type: {
        type: String,
        default: 'others'
    },
    completed:{
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now()
    }
});

var Shopping = mongoose.model('Shopping', shoppingSchema);
module.exports = Shopping;