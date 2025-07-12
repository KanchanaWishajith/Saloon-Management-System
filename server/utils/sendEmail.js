const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  // Create transporter (example using Gmail)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail email
      pass: process.env.EMAIL_PASS, // your Gmail password or app password
    },
  });

  // Email options
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  // Send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
