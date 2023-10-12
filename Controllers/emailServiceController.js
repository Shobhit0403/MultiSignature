const nodemailer = require('nodemailer');

// Create a transporter with your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: '',
  auth: {
    user: '',
    pass: '',
  },
});

const sendEmail = async (from, to) => {
  const subject = "New Process Created";
  const text = "body";
  try {

    // await transporter.sendMail({
    //   from,
    //   to,
    //   subject,
    //   text,
    // });
    console.log(`Email sent to: ${to}`);
  } catch (error) {
    console.error('Email error:', error);
  }
};

module.exports = { sendEmail };