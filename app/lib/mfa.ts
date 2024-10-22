import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function generateOTP() {
    console.log('Generating OTP');
    const secret = speakeasy.generateSecret({ length: 32 });
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    });
    console.log(`Generated OTP: ${token}`);
    return { secret: secret.base32, token };
  }

  export const verifyOTP = (secret: string, token: string) => {
    console.log(`Verifying OTP: ${token} with secret: ${secret}`);
    const result = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2,
    });
    console.log(`OTP verification result: ${result}`);
    return result;
  };

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for login',
    text: `Your OTP is: ${otp}. It will expire in 2 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};