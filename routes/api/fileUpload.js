const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

const Ad = require("../../models/Ad");
const path = require("path");
const fs = require("fs");
let shortid = require('shortid');

router.post("/", (req, res) => {
  if (!req.files) return res.status(400).send("No file were uploaded");
  const media = req.files.media;
  const id = shortid.generate();
  media.mv(`./media/ads/${id}.${req.body.ext}`, err => {
    if (err) return res.status(500).send(err);
    res.send({ id: id, message:"file uploaded"});
  });
});

router.get("/", (req, res) => {
  const errors = [];
  const photo = req.query.photo;
  if (photo != "default"){
    Ad.findOne({ photo: photo }).then(Ad => {
      if (!Ad) {
        errors.photo = "photo are not available";
        res.status(404).json(errors);
      }
      if (Ad.photo) {
        res.type(path.extname(Ad.photo));
        fs.createReadStream(
          path.join("media/images", path.basename(Ad.photo))
        ).pipe(res);
      }
    });
  }
  else {
    res.type(path.extname("default.png"));
    fs.createReadStream(
      path.join("media/images", path.basename("default.png"))
    ).pipe(res);
  }
  
});

module.exports = router;
