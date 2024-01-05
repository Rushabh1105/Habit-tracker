// import required dependencies
import express from 'express';

// Importing required controller functions
import { getChangeStatus, getDelete, getHome, postAddHabits } from '../controller/habit.controller.js';

// Express router
const router = express.Router();

// Route to get Home page
router.get('/', getHome);
// Route to add habit
router.post('/addHabit', postAddHabits);
// Router to get add habit form
router.get('/addHabit', getHome)
// Route to delete a habit
router.get('/delete/:id', getDelete);
// Route to change habit status for specific day
router.get('/changeStatus/:habitId&:status&:dateId', getChangeStatus);
// Exporting the router
export default router;