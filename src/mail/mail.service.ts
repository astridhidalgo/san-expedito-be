import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    console.log(process.env.EMAIL_SERVICE);
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sanexpedito.cbo@gmail.com',
        pass: 'uasr tyfs frmo skig',
      },
    });
  }

  async sendMail(to: string, nombreUsuario: string, nuevaContrasenya: string) {
    const mailOptions = {
      from: 'sanexpedito.cbo@gmail.com',
      to,
      subject: 'Reestablecer Contraseña',
      text: `Reestablecer contraseña.`,
      html: `<p>Hola ${nombreUsuario},</p><p>Para ingresar, se ha generado la siguiente clave provisoria ${nuevaContrasenya}</p><p><a href="http://localhost:4000/">Accede San expedito</a></p><p>Te recomendamos ingresar y modificarla la contraseña por una de tu preferencia</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
