// Importing the required modules
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';

// Importing the required functions and dependencies
import { PORT } from './config/server.config.js'; //Server port
import { connectToDB } from './config/mongoose.config.js'; //DB connect function
import router from './routes/habit.routes.js'; //Router
import { cronJobs } from './utils/task.schedule.js'; //Cron jobs for updating data

// Express server app
const app = express();

// For parsing JSON body in request url
app.use(express.urlencoded({extended: true}));
// For using the EJS views
app.use(expressEjsLayouts);
// Static files
app.use(express.static('./assets'));
// Apply styling and script for EJS layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Set view engine as ejs
app.set('view engine', 'ejs');
// Path for views
app.set('views', './views');
// Router to handle various routes
app.use('/', router);

// Server listen on specfied port
app.listen(PORT, async () => {
    // 1 connnect to DB
    await connectToDB();
    // 2 Run Cron jobs
    cronJobs;
    // 3 Notify for server status
    console.log(`Server started on port ${PORT}`)
})