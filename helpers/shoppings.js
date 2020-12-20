var db = require('../models');

exports.getShoppings = function(req, res){
    db.Shopping.find()
    .then(function(shoppings){
        res.json(shoppings);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createShopping = function(req, res){
    db.Shopping.create(req.body)
    .then(function(newShopping){
        res.status(201).json(newShopping);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.getShopping = function(req, res){
    db.Shopping.findById(req.params.shoppingId)
    .then(function(foundShopping){
        res.json(foundShopping)
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateShopping = function(req, res){
    db.Shopping.findOneAndUpdate({_id: req.params.shoppingId}, req.body, {new: true})
    .then(function(shopping){
        res.json(shopping);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteShopping = function(req, res){
    db.Shopping.deleteOne({_id: req.params.shoppingId})
    .then(function(){
        res.json({message: "Item Deleted"});
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;