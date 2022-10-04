const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast:[{
            type:Schema.Types.ObjectId,
            ref:"Celebrity" // ref option is what tells Mongoose which model to use during population
        }]
    }
);

module.exports = model('Movie', movieSchema);
