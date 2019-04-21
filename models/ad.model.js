var mongoose = require('mongoose');

var AdSchema = mongoose.Schema({
  media: String,
  client: String,
  numPages: Number,
  startDate: Date,
  endDate: Date,
  period: Number,
  mediaType: String
});

AdSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

AdSchema.set('toObject', {
  virtuals: true
});

AdSchema.methods.toJSON = function(){
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
}

module.exports = mongoose.model('Ad', AdSchema);