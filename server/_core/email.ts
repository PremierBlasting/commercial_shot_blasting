import { ENV } from "./env";

interface EmailArgs {
  to: string;
  subject: string;
  html: string;
}

// In a real app, you would use a service like Resend, Postmark, or AWS SES.
// For this example, we will simulate the email sending.
async function sendEmail(args: EmailArgs): Promise<{ success: boolean; error?: string }> {
  console.log(`Simulating email send to: ${args.to}`);
  console.log(`Subject: ${args.subject}`);
  // console.log(`HTML: ${args.html}`);

  // Simulate a successful response
  return { success: true };
}

const WINBACK_7_DAY_SUBJECT = "We've Missed You at Commercial Shot Blasting";
const WINBACK_7_DAY_HTML = `
  <h1>We noticed you've been gone for a week.</h1>
  <p>We're sorry to see you go. We're always working to improve our services and would love to hear any feedback you have.</p>
  <p>If you'd like to give us another try, we'd be happy to offer you a 10% discount on your next project. Just use the code COMEBACK10.</p>
  <p>Thanks,</p>
  <p>The Commercial Shot Blasting Team</p>
`;

const WINBACK_30_DAY_SUBJECT = "A Special Offer to Welcome You Back";
const WINBACK_30_DAY_HTML = `
  <h1>It's been a month since you cancelled.</h1>
  <p>We haven't forgotten about you! We're committed to providing the best commercial shot blasting services in the UK, and we'd love the opportunity to prove it to you again.</p>
  <p>As a special welcome back offer, we'd like to give you a 20% discount on your next project. Use the code WELCOMEBACK20 to claim your discount.</p>
  <p>We hope to see you again soon.</p>
  <p>Best regards,</p>
  <p>The Commercial Shot Blasting Team</p>
`;

export async function sendWinbackEmail(
  userEmail: string,
  type: '7-day' | '30-day'
): Promise<boolean> {
  const subject = type === '7-day' ? WINBACK_7_DAY_SUBJECT : WINBACK_30_DAY_SUBJECT;
  const html = type === '7-day' ? WINBACK_7_DAY_HTML : WINBACK_30_DAY_HTML;

  const { success, error } = await sendEmail({
    to: userEmail,
    subject,
    html,
  });

  if (!success) {
    console.error(`Failed to send ${type} win-back email to ${userEmail}: ${error}`);
  }

  return success;
}
