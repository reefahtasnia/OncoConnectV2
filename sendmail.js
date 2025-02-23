require("dotenv").config();
const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {  // <-- Case-sensitive name
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Use actual parameters instead of hardcoded values
    const mailOptions = {
      from: `"OncoConnect" <${process.env.EMAIL_USER}>`,
      to: email,  // Use the email parameter
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #7c3aed;">Password Reset Request</h2>
          <p>Your OTP for password reset is:</p>
          <div style="font-size: 24px; font-weight: bold; color: #7c3aed; margin: 20px 0;">
            ${otp}  <!-- Use the otp parameter -->
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p style="color: #666; margin-top: 30px;">
            If you didn't request this password reset, please ignore this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// CommonJS export
module.exports = sendOTPEmail;