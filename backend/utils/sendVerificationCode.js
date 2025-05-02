import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode,email,res) {
    try {
        const message=generateVerificationOtpEmailTemplate(verificationCode);
        await sendEmail({
            email,
            subject:"Verification Code (BookHive Library Management System)",
            message
        });
        res.status(200).json({
            success:true,
            message:"Verification code sent successfully."
        })
    } catch (error) {
        console.error("Error sending verification email", error);
        
        return res.status(500).json({
            success:false,
            message:"Failed to send verification code!"
        })
    }
}