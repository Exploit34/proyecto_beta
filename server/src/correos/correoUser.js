import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config()

const control = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        gmail: process.env.GMAIL ,
        accessToken: process.env.TOKEN
    }
});

async function correoUser(email, username){
    try {

        const user = path.join(__dirname, 'htmlCorreo', 'user.html');
        const content = fs.readFileSync(user, 'utf-8');
        const message = "Bienvenido a MarketSharet"
        const messageText = `Hola 👋 ${username}`

        const info = await control.sendMail({
            from: process.env.GMAIL,
            to: email,
            subject: message,
            text: messageText,
            html: content
        });
        console.log(`El correo se le envio a: ${email}: apartetado de info ${info.messageId}`);
    } catch (error) {
        console.error(`!Oh no hubo un error al enviar el correo de ${email}¡`, error);
    }
}

export default correoUser