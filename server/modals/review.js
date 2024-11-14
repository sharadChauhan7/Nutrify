import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    wholeReview:[{
        feedbackText: {
            type: String,
            trim: true 
        },
        position:{
            type: Number,
        },
        reviewName: {
            type: String,
            required: true
        },
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

export default mongoose.model('Review', reviewSchema);
