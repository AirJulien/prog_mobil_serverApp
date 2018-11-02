const mongoose = require('mongoose');
const autoIncrement = require( 'mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const questionSchema = new mongoose.Schema({
    title_question: String,
    text_response1:String,
    text_response2:String,
    text_response3:String,
    value_response1 : Boolean,
    value_response2 : Boolean,
    value_response3 : Boolean
});

questionSchema.plugin(autoIncrement.plugin, {model: 'Question', startAt: 1});

module.exports = mongoose.model('Question', questionSchema);