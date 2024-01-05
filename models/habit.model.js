// Importing mongoose model
import mongoose from "mongoose";

// Schema for habit
const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dates: [
        {
            day: String,
            month: String,
            year: String,
            status: {
                type: String,
                enum: ['Done', 'Not Done', 'None'],
                default: 'None'
            }
        }
    ]
}, {
    toJSON: { virtuals: true }
});

// Create a habit mongoose model
const HabitModel = mongoose.model('Habit', habitSchema);
// Export model to perform Database operations
export default HabitModel;