import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="px-8 py-10 sm:p-12">
          <h3 className="text-3xl font-extrabold text-white mb-4">
            Let's Connect.
          </h3>
          <p className="mt-2 text-lg text-gray-300 mb-8">
            Got a project in mind? Or just want to say hi? Feel free to drop me a message.
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-400"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  className="block w-full rounded-xl border-transparent bg-gray-800 bg-opacity-50 text-white placeholder-gray-500 py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-400"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  className="block w-full rounded-xl border-transparent bg-gray-800 bg-opacity-50 text-white placeholder-gray-500 py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400"
              >
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="block w-full rounded-xl border-transparent bg-gray-800 bg-opacity-50 text-white placeholder-gray-500 py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  placeholder="Your Message"
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;