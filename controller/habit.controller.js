import cron from 'node-cron';
// Import required repository functions
import { addHabit, deleteHabit, getData, updateData, updateStatus } from '../repository/habit.repository.js';

// Function to render home page
export const getHome = async (req, res) => {
    try {
        // cron.schedule('0 0 * * *', async () => {
        //     const d = new Date();
        //     const day = d.getDate();
        //     const month = d.getMonth(); 
        //     const year = d.getFullYear();

        //     const date = {
        //         day: day,
        //         month: month, 
        //         year: year, 
        //         status: 'None',
        //     }

        //     const filter = {};
        //     const options = { upsert: true };

        //     const updateDoc = {
        //         $addToSet: {
        //             dates: date
        //         },
        //     };

        //     await updateData(filter, updateDoc, options)
        //     console.log('Doc updated')
        // });

        const data = await getData();

        res.render('home', {
            habits: data,
        })
    } catch (error) {
        res.render('error')
    }
}

// Function to add new habit to list
export const postAddHabits = async (req, res) => {
    try {
        const {habit, desc} = req.body;
        
        await addHabit(habit, desc);

        const data = await getData();
        return res.render('home', {
            habits: data,
        })
    } catch (error) {
        console.log(error);
        res.render('error')
    }
}

// Function to delete a habit by its id
export const getDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteHabit(id)
        return res.redirect('/');
    } catch (error) {
        console.log(error)
        res.render('error')
    }
}

// Function to change habit status
export const getChangeStatus = async (req, res) => {
    try {
        const habitId = req.params.habitId;
        const status = req.params.status;
        const dateId = req.params.dateId;
        // console.log(habitId, status, index);
        await updateStatus(habitId, status, dateId)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('error')
    }
}