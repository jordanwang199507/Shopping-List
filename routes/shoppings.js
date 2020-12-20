var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require("../helpers/shoppings");

router.route('/')
.get(helpers.getShoppings)
.post(helpers.createShopping)

router.route('/:shoppingId')
.get(helpers.getShopping)
.put(helpers.updateShopping)
.delete(helpers.deleteShopping)

// router.get('/', function(req, res){
//     db.Shopping.find()
//     .then(function(shoppings){
//         res.json(shoppings);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.post('/', function(req, res){
//     db.Shopping.create(req.body)
//     .then(function(newShopping){
//         res.status(201).json(newShopping);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.put('/:shoppingId', function(req, res){
//     db.Shopping.findOneAndUpdate({_id: req.params.shoppingId}, req.body, {new: true})
//     .then(function(shopping){
//         res.json(shopping);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.delete('/:shoppingId', function(req, res){
//     db.Shopping.deleteOne({_id: req.params.todoId})
//     .then(function(){
//         res.json({message: "Item Deleted"});
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// })

module.exports = router;