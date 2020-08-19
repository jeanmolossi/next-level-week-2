import nodemailer from 'nodemailer';

import mailConfig from '@configs/mailer';

export default async function sendMail(
  toEmail: string,
  token: string,
): Promise<void> {
  const testAccount = await nodemailer.createTestAccount();

  const configsObject = mailConfig(testAccount.user, testAccount.pass);

  const transporter = nodemailer.createTransport({
    ...configsObject,
  });

  const link = `http://192.168.0.104:3000/recover-password/${token}`;

  const mail = await transporter.sendMail({
    from: '"Equipe proffy" <nao-responder@proffy.com.br>',
    to: `${toEmail}`,
    subject: `Recuperação de senha`,
    text: `Houve uma tentativa de recuperação de senha.\n\nSe foi você copie o link abaixo e cole no seu navegador\n\n${link}`,
    html: `Houve uma tentativa de recuperação de senha.<br /><br />Se foi você clique no link abaixo<br /><br /><a href="${link}">Recuperar senha</a>`,
  });

  console.log('Email enviado: %s', mail.messageId);
  console.log('Preview do e-mail: %s', nodemailer.getTestMessageUrl(mail));
}
