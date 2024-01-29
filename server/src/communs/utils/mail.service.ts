import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private societeName: string;
  private managerName: string;

  constructor(private readonly configService: ConfigService) {
    // Initialisation des valeurs une fois dans le constructeur
    this.societeName = this.configService.get<string>('SOCIETY_NAME');
    this.managerName = this.configService.get<string>('MANAGER_NAME');
  }

  private async transporter() {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
    return transport;
  }

  async sendRegisterConfirmation(email: string, fullName: string, token: string) {
    const verificationLink = `${this.configService.get<string>('ORIGIN_URL')}/auth/confirm?token=${token}`;
    // Configuration de l'e-mail

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Vérification de votre adresse e-mail',
      html: `
            <html>
                <head>
                    <style>
                        /* Styles CSS en ligne */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                        .signature {
                            text-align: right;
                            font-style: italic;
                            color: #999;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <span>Bonjour <h1> ${fullName},</h1></span>
                        <p>Merci d'avoir rejoint ${this.societeName} ! Vous avez 7h pour activer votre compte et commencer à explorer, veuillez cliquer sur le lien de vérification ci-dessous :</p>
                        <a href="${verificationLink}" target="_blank">${verificationLink}</a>
                        <div class="signature">
                            Cordialement,<br>
                            ${this.managerName}
                        </div>
                    </div>
                </body>
            </html>
        `,
    };
    // Envoyer l'e-mail
    try {
      const info = await (await this.transporter()).sendMail(mailOptions);
      console.log('E-mail ConfirmatEmail envoyé : ' + info.response);
      return info;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error lors de l'envoie de l'email de confirmation");
    }
  }
  async sendCodeResetPassword(email: string, fullName: string, code: string) {
    // Configuration de l'e-mail

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Reinisialisation du mot de passe.',
      html: `
            <html>
                <head>
                    <style>
                        /* Styles CSS en ligne */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                        .signature {
                            text-align: right;
                            font-style: italic;
                            color: #999;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <span>Bonjour <h3> ${fullName},</h3></span>
                        <p>Vous avez fait une demande de réinisialisation de votre mot de pass? :</p>
                        <p>Utilise le code suivant dans votre processus pour changer votre mot de passe.</p>
                        <h2>${code}</h2>
                        <p>Le code est valable en 15 minutes.</p>
                        <div class="signature">
                            Cordialement,<br>
                            ${this.managerName}
                        </div>
                    </div>
                </body>
            </html>
        `,
    };
    // Envoyer l'e-mail
    try {
      const info = await (await this.transporter()).sendMail(mailOptions);
      console.log('E-mail ResetPassword envoyé : ' + info.response);
      return info;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error lors de l'envoie de l'email de reset password");
    }
  }
}
