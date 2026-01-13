const {model} = require('mongoose');

const {holdingSchema} = require('../Schemas/HoldingsSchema');

const HoldingsModel = new model('holdings', holdingSchema);

module.exports={HoldingsModel};

