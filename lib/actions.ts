"use server";

import { EmailTemplate } from "@/app/(site)/components/email-template";
import { Resend } from "resend";

import {z} from "zod"
import { FormDataSchema } from "@/lib/schema";

type Inputs = z.infer<typeof FormDataSchema>

const SendEmail = (data: Inputs) => {
  const result = FormDataSchema.safeParse(data)

  if (!result.success) {
    return {success: false, error: result.error.format()}
  }

  const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
  
  try {
    const emailData = resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["juliansv22@gmail.com"],
      subject: data.email,
      react: EmailTemplate({
        firstName: data.name,
        message: data.message,
      }),
      text: "",
    });

    return { success: true, emailData };
  } catch (error) {
    return { success: false, error: error };
  }
};

export default SendEmail;
