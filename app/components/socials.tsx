import Link from "next/link";

const Socials = () => {
  return (
    <div className="mt-10 grid md:grid-cols-4">
      {/* Discord */}
      <button
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        className="m-auto w-1/2 rounded bg-[#7289da] py-2.5 text-white shadow-md transition-all duration-300 before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-[#7289da] hover:shadow-[#7289da] hover:before:border-[25px]"
      >
        <Link href="https://discord.gg/EG4NJp8E">
          <svg
            className="m-auto h-4 w-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 24 24"
          >
            <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
          </svg>
        </Link>
      </button>
      {/* Github */}
      <button
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        className="m-auto mb-2 w-1/2 rounded bg-[#333] py-2.5 text-white shadow-md transition-all duration-300 before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-[#333] hover:shadow-[#333] hover:before:border-[25px]"
      >
        <Link href="https://github.com/juliansv">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Link>
      </button>
      {/* Google */}
      <button
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        className="m-auto mb-2 w-1/2 rounded bg-[#ea4335] py-2.5 text-white shadow-md transition-all duration-300 before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-[#ea4335] hover:shadow-[#ea4335] hover:before:border-[25px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Linkedin */}
      <button
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        className="m-auto mb-2 w-1/2 rounded bg-[#0077b5] py-2.5 text-white shadow-md transition-all duration-300 before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-[#0077b5] hover:shadow-[#0077b5] hover:before:border-[25px]"
      >
        <Link href="https://www.linkedin.com/in/juliansuarezvivas/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        </Link>
      </button>
    </div>
  );
};

export default Socials;
