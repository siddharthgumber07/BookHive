import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE, 
        port: Number(process.env.SMTP_PORT), 
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
};
