function newDeviceLoginEmail(deviceName, dateTime, email) 
{
    return `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
                .header { background-color: #FF0000; color: white; padding: 10px; text-align: center; }
                .content { padding: 20px; }
                .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Suspicious Login Attempt Detected</h2>
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>We noticed a new login attempt on your account using the email: <strong>${email}</strong>.</p>
                    <p>Device: <strong>${deviceName}</strong></p>
                    <p>Date & Time: <strong>${dateTime}</strong></p>
                    <p>If this was you, no action is required. However, if this wasn't you, we recommend changing your password immediately.</p>
                    <p><a href="https://yourwebsite.com/reset-password" style="color: red; font-weight: bold;">Reset Your Password</a></p>
                    <p>Stay Safe,<br>Security Team</p>
                </div>
                <div class="footer">
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = newDeviceLoginEmail;