function newRegistrationEmail(deviceName, dateTime, userName, userEmail) 
{
    return `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
                .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
                .content { padding: 20px; }
                .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Welcome to Our Platform, ${userName}!</h2>
                </div>
                <div class="content">
                    <p>Dear ${userName},</p>
                    <p>Your account has been successfully created using the email: <strong>${userEmail}</strong>.</p>
                    <p>You registered using the device: <strong>${deviceName}</strong>.</p>
                    <p>Registration Date & Time: <strong>${dateTime}</strong>.</p>
                    <p>We’re excited to have you on board!</p>
                    <p>Best Regards,<br>Support Team</p>
                </div>
                <div class="footer">
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = newRegistrationEmail;
