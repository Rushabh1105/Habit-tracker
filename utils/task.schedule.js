// Importing cron dependency
import cron from 'node-cron';
// Importing the repository function
import {updateDataInCron } from '../repository/habit.repository.js';

// Exporting cron variable to run in main server
// Cron job is schedule to work at 12 AM every night
export const cronJobs = cron.schedule('0 0 * * *', async () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth(); 
    const year = d.getFullYear();
    // Making a new Date object
    const date = {  
        day: day,
        month: month, 
        year: year, 
        status: 'None',
    }
    // Adding new date at each day to the habit database
    await updateDataInCron(date);
    console.log('cron job executed')
})