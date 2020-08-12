import nodemailer from 'nodemailer';

import mailConfig from '@configs/mailer';

export default async function sendMail(toMail: string, token: string) {
  const testAccount = await nodemailer.createTestAccount();

  const configsObject = mailConfig(testAccount.user, testAccount.pass);

  const transporter = nodemailer.createTransport({
    ...configsObject,
  });

  const link = `http://localhost:3000/recover-password/${token}`;

  const info = await transporter.sendMail({
    from: '"Equipe proffy" <recuperar-senha@proffy.com.br>',
    to: `${toMail}`,
    subject: `Recuperação de senha`,
    text: `Houve uma tentativa de recuperação de senha.\n\nSe foi você clique no link abaixo\n\n${link}`,
    html: `Houve uma tentativa de recuperação de senha.\n\nSe foi você clique no link abaixo\n\n<a href="${link}">Recuperar</a>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
