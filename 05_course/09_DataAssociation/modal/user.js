const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/dataassociation")

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    age: Number,
    // posts:Array //old code
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]

})

module.exports = mongoose.model('user', userSchema)
