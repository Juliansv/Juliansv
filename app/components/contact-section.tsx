"use client";

import { useState } from "react";
import ContactForm from "./contact-form";
import EmailSentCard from "./email-sent-card";
import { Element } from "react-scroll";

const Contact = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  return (
    <section aria-labelledby="Contact">
      <Element name="Contact" className="min-h-screen md:px-40">
        <div className="container m-auto flex w-1/2 flex-col items-center gap-4 rounded-lg bg-[#00a8e60d]/[.1] shadow-md shadow-sky-500">
          {!isEmailSent ? (
            <ContactForm setEmail={setIsEmailSent} />
          ) : (
            <EmailSentCard />
          )}
        </div>
      </Element>
    </section>
  );
};

export default Contact;
