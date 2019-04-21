var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Ad = require('../models/ad');

/* GET ads listing. */

router.post('/', function(req, res, next) {

  if (!req.files) return res.status(400).send("No file were uploaded");
  const photo = req.files.photo;
  photo.mv(`./media/images/${photo.name}`, err => {
    if (err) return res.status(500).send(err);
    res.send("file uploaded");
  });

  let adToCreate = new Ad(req.body);
  adToCreate.save(function(err, ad){
    res.send(ad);
  });
});

router.get('/', function(req, res, next) {
  Ad.find(function (err, ads){
    if (err) return console.error(err);
    res.json(ads);    
  });
});

router.get('/:id', function(req, res, next) {
  Ad.findOne({_id: req.params["id"]}, function (err, ad){
    if (err) return console.error(err);
    res.send(ad);
  });
});

router.put('/:id', function(req, res, next) {
  Ad.findByIdAndUpdate({_id: req.params["id"]}, req.body, function(err, ad) {
    if (err) return next(err);
    res.status(204).send();
  });
}); 

router.delete('/:id', function(req, res, next) {
  Ad.deleteOne({_id: req.params["id"]}, function(err, ad) {
    if (err) return next(err);
    res.status(204).send();
  });
});

module.exports = router;
