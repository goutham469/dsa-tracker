function taskReminderEmail(userName, taskTitle, scheduledToDo) {

    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                    text-align: center;
                }
                .email-container {
                    max-width: 600px;
                    margin: auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
                .task-details {
                    margin: 20px 0;
                    padding: 15px;
                    background: #fafafa;
                    border-left: 5px solid #007bff;
                    text-align: left;
                }
                .task-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #007bff;
                }
                .cta-button {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 20px;
                    background: #28a745;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .cta-button:hover {
                    background: #218838;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <p class="header">Task Reminder</p>
                <p>Hi <strong>${userName}</strong>,</p>
                <p>This is a reminder to complete your scheduled task:</p>
                
                <div class="task-details">
                    <p class="task-title">${taskTitle}</p>
                    <p><strong>Due Date:</strong> ${scheduledToDo}</p>
                </div>
                
                <a href="#" class="cta-button">Complete Task</a>

                <p class="footer">If you have already completed this task, you can ignore this reminder.</p>
            </div>
        </body>
        </html>
    `;
}

module.exports = taskReminderEmail;