export default function mailConfig(user, password) {
  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user,
      pass: password,
    },
  };
}
