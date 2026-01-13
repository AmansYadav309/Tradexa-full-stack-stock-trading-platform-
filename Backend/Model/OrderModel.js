const {model} = require('mongoose');

const {OrderSchema} = require('../Schemas/OrderSchema');

const watchlistModel = new model('watchlist' , OrderSchema);

module.exports={watchlistModel};