const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    original_url: String,
    short_url: String
},{
    timestamps: true
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;