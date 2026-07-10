import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface VerificationEmailPayload {
  to: string;
  channelPartnerName: string;
  propertyId: string;
  propertyName: string;
  totalPhotos: number;
}

export async function sendPropertyVerificationEmail(payload: VerificationEmailPayload) {
  const { to, channelPartnerName, propertyId, propertyName, totalPhotos } = payload;

  const mailOptions = {
    from: `"KMA Properties Notification" <${process.env.SMTP_USER}>`,
    to: to,
    subject: `[NEW] Property Verification Completed by ${channelPartnerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
        <h2 style="color: #010048; border-bottom: 2px solid #010048; padding-bottom: 10px;">Property Verification Verified Alert</h2>
        <p>Hi KMA Team,</p>
        <p>A channel partner has successfully completed the live location photography verification flow. Below are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f9f9f9; border: 1px solid #ddd;">Property ID:</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-family: monospace; font-size: 12px;">${propertyId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f9f9f9; border: 1px solid #ddd;">Verified Media Counts:</td>
            <td style="padding: 8px; border: 1px solid #ddd; color: green; font-weight: bold;">${totalPhotos} Photos Uploaded</td>
          </tr>
        </table>

        <div style="margin-top: 25px; text-align: center;">
          <a href="http://kma-admin.s3-website.ap-south-1.amazonaws.com/" 
             style="background: #33AB41; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 50px; display: inline-block;">
             Review Verification on Admin Panel
          </a>
        </div>
        
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}