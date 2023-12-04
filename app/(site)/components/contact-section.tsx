"use client";

import { useState } from "react";
import ContactForm from "./contact-form";

const Contact = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  return (
    <div className="container flex flex-col gap-4 items-center min-h-screen">
      {!isEmailSent ? (
        <ContactForm setEmail={setIsEmailSent} />
      ) : (
        <div>Email Sent</div>
      )}
    </div>
  );
};

export default Contact;
