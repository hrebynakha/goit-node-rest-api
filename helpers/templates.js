export const createVerificationTemplate = ({ name, verificationLink }) => {
  return `
    <html>
      <body>
        <h1>Hi, ${name}!</h1>
        <p>Click the link below to verify your account:</p>
        <a href="${verificationLink}">Verify Your Account</a>
      </body>
    </html>
  `;
};
