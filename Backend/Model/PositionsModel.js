const {model} = require('mongoose');
const { positionsSchema} = require('../Schemas/PositionsSchema')


const PositionsModel = new model('position' , positionsSchema) ;

module.exports={PositionsModel};