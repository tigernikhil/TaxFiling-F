const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

exports.sendTaxFilingReminder = async (userEmail, financialYear) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: `ITR Filing Reminder for FY ${financialYear}`,
    html: `<h2>Time to file your Income Tax Return</h2><p>Please complete your ITR filing for FY ${financialYear}.</p>`
  };

  return transporter.sendMail(mailOptions);
};

exports.sendFilingConfirmation = async (userEmail, returnData) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: 'ITR Filing Successful',
    html: `<h2>Your tax return has been successfully filed</h2><p>Financial Year: ${returnData.financialYear}</p>`
  };

  return transporter.sendMail(mailOptions);
};
