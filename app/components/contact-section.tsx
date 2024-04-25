"use client";

import { useState } from "react";
import ContactForm from "./contact-form";
import EmailSentCard from "./email-sent-card";
import { Element } from "react-scroll";

const Contact = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  return (
    <section aria-labelledby="Contact">
      <Element
        name="Contact"
        className="mt-10 min-h-screen px-10 md:m-auto md:w-1/2"
      >
        <div className="container m-auto flex flex-col items-center gap-4 rounded-lg bg-[#00a8e60d]/[.1] shadow-md hover:shadow-md hover:shadow-sky-500 md:mt-10">
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
