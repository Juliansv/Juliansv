"use client";

import SendEmail from "@/lib/actions";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormDataSchema } from "@/lib/schema";
import Spinner from "./spinner";
import { useState } from "react";

type Inputs = z.infer<typeof FormDataSchema>;

interface ContactFormProps {
  setEmail: (value: boolean) => void;
}

const ContactForm = ({ setEmail }: ContactFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await SendEmail(data);

    setIsLoading(true);

    if (result?.success) {
      setTimeout(() => {
        setEmail(true);
        setIsLoading(false);
        reset();
      }, 3000);
      return;
    }

    console.log(result?.error);
  };

  return (
    <div className={isLoading ? "opacity-40 w-1/2" : "w-1/2"}>
      <div className="pb-10 text-center">
        <h2 className="text-4xl font-bold text-sky-700">
          <span
            className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
          bg-clip-text text-transparent"
          >
            Let&apos;s connect!
          </span>
        </h2>
        <p className="dark:text-sky-500">Feel free to reach out</p>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(processForm)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 aria-[invalid=true]:dark:border-red-500 aria-[invalid=true]:dark:focus-visible:border-red-600"
              placeholder="John Doe"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 aria-[invalid=true]:dark:border-red-500"
              placeholder="name@gmail.com"
              autoComplete="off"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 aria-[invalid=true]:dark:border-red-500"
              placeholder="Leave a comment..."
              defaultValue={""}
              aria-invalid={errors.message ? "true" : "false"}
              {...register("message")}
            />
            {errors.message?.message && (
              <p className="text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default ContactForm;
