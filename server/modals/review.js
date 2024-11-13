const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feedback: {
        type: String,
        trim: true 
    },
    date: {
        type: Date, 
        required: true
    },
    reviewName: {
        type: String,
        required: true
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true 
            },
            reviewScore: {
                type: Number,
                min: 0, 
                max: 5, 
                required: true 
            },
            subQuestions: [
                {
                    subQuestionText: {
                        type: String,
                        required: true 
                    },
                    subReviewScore: {
                        type: Number,
                        min: 0, 
                        max: 5, 
                        required: true 
                    }
                }
            ]
        }
    ]
}, { timestamps: true }); 

module.exports = mongoose.model('Review', reviewSchema);