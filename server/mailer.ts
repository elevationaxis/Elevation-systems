import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "elevationaxis@gmail.com";

function createTransport() {
  // Uses environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  // For Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=587, SMTP_USER=your@gmail.com, SMTP_PASS=app-password
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  businessName: string;
  message: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("[mailer] SMTP not configured — skipping contact notification email");
    return;
  }

  const transporter = createTransport();

  await transporter.sendMail({
    from: `"Elevation Axis" <${process.env.SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New Contact Form Submission — ${data.businessName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 4px;">New Contact Form Submission</h2>
        <p style="color: #666; margin-top: 0;">Someone filled out the contact form on Elevation Axis.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #999; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Business</td><td style="padding: 8px 0;">${data.businessName}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 13px; margin-bottom: 4px;">Message</p>
        <p style="background: #f9f9f9; padding: 16px; border-radius: 4px; margin: 0;">${data.message.replace(/\n/g, "<br/>")}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <a href="mailto:${data.email}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: 600; border-radius: 2px;">Reply to ${data.name}</a>
      </div>
    `,
  });

  console.log(`[mailer] Contact notification sent for ${data.businessName}`);
}

export async function sendAuditNotification(data: {
  businessName: string;
  email: string;
  websiteUrl: string;
  auditId: number;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("[mailer] SMTP not configured — skipping audit notification email");
    return;
  }

  const transporter = createTransport();

  await transporter.sendMail({
    from: `"Elevation Axis" <${process.env.SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New Free Analysis Request — ${data.businessName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 4px;">New Free Analysis Request</h2>
        <p style="color: #666; margin-top: 0;">Someone requested a free website analysis on Elevation Axis.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #999; width: 140px;">Business</td><td style="padding: 8px 0; font-weight: 600;">${data.businessName}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Website</td><td style="padding: 8px 0;"><a href="${data.websiteUrl}" target="_blank">${data.websiteUrl}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Audit ID</td><td style="padding: 8px 0; color: #999;">#${data.auditId}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <a href="mailto:${data.email}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: 600; border-radius: 2px;">Follow Up with ${data.businessName}</a>
      </div>
    `,
  });

  console.log(`[mailer] Audit notification sent for ${data.businessName}`);
}
