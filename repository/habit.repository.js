// Import habit model
import HabitModel from "../models/habit.model.js"

// Fetch all habit data from database
export const getData = async () => {
    return await HabitModel.find();
}

// Add new habit to the database with today as starting date
export const addHabit = async (name, desc) => {
    try {
        const habit = new HabitModel({
            name: name,
            description: desc,
            dates: {
                day: new Date().getDate(),
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                status: 'None'
            }
        });
        await habit.save();
        return;
    } catch (error) {
        throw error;
    }
}

// Update the habit data
export const updateData = async (filter, updatedData, options) => {
    try {
        // console.log(filter)
        // console.log(updatedData)
        // console.log(options)
        await HabitModel.updateMany(filter, updatedData, options);
        return;
    } catch (error) {
        throw error
    }
}

// Delete a habit from database
export const deleteHabit = async (id) => {
    try {
        console.log(id)
        await HabitModel.findByIdAndDelete(id);
        return;
    } catch (error) {
        throw error
    }
}

// Change habit status for specific day
export const updateStatus = async (id, status, dateId) => {
    try {
        const habit = await HabitModel.findById(id);
        habit.dates.forEach((date) => {
            if(date._id == dateId){
                if(status == 'Done'){
                    date.status = 'Done';
                }else{
                    date.status = 'Not Done';
                }
            }
        })
        await habit.save();
        return;
    } catch (error) {
        throw error
    }
}

// Update data in cron
export const updateDataInCron = async (date) => {
    try {
        const data = await HabitModel.find();
        const filter = {};
        const options = { upsert: true };

        const updatedData = {
            $addToSet: {
                dates: date
            },
        };

        await HabitModel.updateMany(filter, updatedData, options);
        return;
        // data.forEach(async (habit) => {
        //     console.log(habit)
        //     if(parseInt(habit.day)<date.day || parseInt(habit.month)<date.month){
        //         date.status = 'None';
        //         habit.dates.push(date);
        //         await habit.save();
        //     }
        // })
    } catch (error) {
        throw error;
    }
}