import React from 'react';
import { FiSend } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="pt-10 bg-slate-700">
      <div className="max-w-screen-xl mx-auto px-4 text-white md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <img
            src="/assets/White logo - no background.png"
            className="max-w-l sm:mx-auto"
          />
          <p>
            Are you an existing client? Log in here. New to us? Let's connect!
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            <a href="/signin" className="block py-2 px-4 text-center text-white font-medium bg-indigo-500 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
              Login
            </a>
            <a href="mailto:info@hoonuitechnologies.dev?subject=Inquiry%20About%20Software%20Consulting%20Services" className="flex items-center justify-center gap-x-2 py-2 px-4 text-white hover:text-white font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex">
              <FiSend />
              Contact us
            </a>

          </div>
        </div>
        <div className="mt-10 py-10 border-t text-center">
          <p>Ho'onui Technologies LLC, 2023.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
