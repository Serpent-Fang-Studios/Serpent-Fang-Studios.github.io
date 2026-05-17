const expressAsyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: process.env.SFS_EMAIL_USER,
        pass: process.env.SFS_EMAIL_PASS
    }
});

const connectEmail = async ()=>{
    try {
        await transporter.verify();
        console.log("Server Succesfully Connected to email, ready to send messages");
    } catch (error) {
        console.log("Verification failed: " + error)
        process.exit(-1);
    }
}


const sendMessage = expressAsyncHandler( async(recipient, subject, messagetxt, messageHtml)=>{
    try {
        const info = await transporter.sendMail({
            from: '"Serpent Fang Studios" <serpentfangstudios@gmail.com>',
            to:recipient,
            subject:subject,
            text:messagetxt,
            html:messageHtml
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error while sending mail:", err);   
    }
});

module.exports = {connectEmail, sendMessage}