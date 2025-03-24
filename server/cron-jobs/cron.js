const pool = require("../middlewares/db");
const taskReminderEmail = require("../templates/taskRemainder");
const sendEmail = require("../utils/sendEmail");

async function remainder_task_cron_scheduler() {
    try {
        const currentTime = Date.now(); // Get current timestamp in milliseconds

        // Fetch all pending cron jobs along with related task details
        const jobs = await pool.query(`
            SELECT c.id as job_id, c.time_scheduled_to_do, c.revise_id, r.user_id, r.question_id, 
                   u.email, u.name, q.question
            FROM cron_jobs c
            JOIN revise r ON c.revise_id = r.id
            JOIN users u ON r.user_id = u.id
            JOIN questions q ON r.question_id = q.id
            WHERE c.sent = $1 AND r.completed = $2
            ORDER BY c.time_scheduled_to_do LIMIT 5;
        `, ['NO', 'NO']);

        console.log(jobs.rows);

        // Loop through scheduled jobs
        for (const job of jobs.rows) {
            const jobTime = new Date(job.time_scheduled_to_do).getTime();

            if (jobTime < currentTime) {
                try {
                    // Generate email template
                    const template = taskReminderEmail(job.name, job.question, job.time_scheduled_to_do);

                    // Send email
                    await sendEmail(job.email, "Task Due Reminder", template);
                    console.log(`Reminder sent to: ${job.email}`);

                    // Mark the job as sent in the database
                    await pool.query("UPDATE cron_jobs SET sent=$1 WHERE id=$2", ['YES', job.job_id]);

                    // Wait 2 seconds before sending the next email
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } catch (emailError) {
                    console.error(`Failed to send email to ${job.email}:`, emailError.message);
                }
            }
        }
    } catch (error) {
        console.error("Error in remainder_task_cron_scheduler:", error.message);
    }
}


module.exports = remainder_task_cron_scheduler;








// async function remainder_task_cron_scheduler() {
//     try {
//         let a = Date.now(); // Get current timestamp in milliseconds

//         // Fetch data from the database
//         const remainders = await pool.query("SELECT * FROM revise WHERE completed=$1", ['NO']);
//         const users = await pool.query("SELECT id, email, name FROM users");
//         const jobs = await pool.query("SELECT * FROM cron_jobs WHERE sent=$1 ORDER BY time_scheduled_to_do", ['NO']);
//         const questions = await pool.query("SELECT id, question FROM questions");

//         console.log(remainders.rows);
//         console.log(users.rows);
//         console.log(jobs.rows);

//         // Loop through scheduled jobs
//         for (const job of jobs.rows) {
//             if (job.time_scheduled_to_do < a) {
//                 const task = remainders.rows.find(remainder => remainder.id === job.revise_id);
//                 if (!task) continue; // Skip if no task found

//                 const user = users.rows.find(user => user.id === task.user_id);
//                 if (!user) continue; // Skip if no user found

//                 const question = questions.rows.find(question => question.id === task.question_id);
//                 if (!question) continue; // Skip if no question found

//                 // Generate email template and send email
//                 const template = taskReminderEmail(user.name, question.question, job.time_scheduled_to_do);
//                 await sendEmail(user.email, "Task Due Reminder", template);

//                 await new Promise(resolve => setTimeout(resolve, 2000));
//                 await pool.query("UPDATE cron_jobs SET sent=$1 WHERE id=$2" , [ 'YES' , job.id ] )

//                 console.log(`Reminder sent to: ${user.email}`);
//             }
//         }
//     } catch (error) {
//         console.error("Error in remainder_task_cron_scheduler:", error.message);
//     }
// }
