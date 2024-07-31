import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const DailyCalorieIntakeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true },
    meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
    total_calories: Number,
    __v: Number
});

export default mongoose.model('DailyCalorieIntake', DailyCalorieIntakeSchema);