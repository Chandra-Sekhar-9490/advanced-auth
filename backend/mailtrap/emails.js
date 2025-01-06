import { MailtrapClient } from "mailtrap";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export async function sendVerificationEmail(email, verificationToken) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error sending verification email:", error);
  }
}

export async function sendWelcomeEmail(email, name) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "0d2a37b3-1d76-43db-b6ef-50b1a7f8f8b2",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error sending welcome email:", error);
  }
}

export async function sendPasswordResetEmail(email, resetURL) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
}

export async function sendResetSuccessEmail(email) {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Successful",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error sending reset success email:", error);
  }
}
