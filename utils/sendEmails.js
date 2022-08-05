const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    let transporter = nodemailer.createTransport({
         // 1) Create transporter (service that will send email like "Gmail", "MialTrap")
        service: 'gmail',
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });

      const mailOptions = {
        from: "E-Shop Udemy Course",
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
      // 3) Send email
      await transporter.sendMail(mailOptions);
}


module.exports = sendEmail