import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-700 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              Welcome to Shrisant Academy
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We're dedicated to empowering developers with the knowledge and skills to excel in programming and web development. Our mission is to provide clear, concise, and practical content that makes learning accessible and enjoyable.
            </p>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                What We Focus On
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Comprehensive tutorials on popular programming languages.</li>
                <li>Hands-on guides to modern web development technologies.</li>
                <li>Practical tips for boosting coding productivity.</li>
                <li>Insights into the latest industry trends.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Approach
              </h3>
              <p className="text-gray-700">
                We believe in learning by doing. Our content is designed to be practical, with real-world examples and projects that help you apply what you learn. We're committed to providing accurate and up-to-date information, ensuring you stay ahead in the ever-evolving world of tech.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4827576/pexels-photo-4827576.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with your image URL
              alt="Shrisant Academy"
              className="w-full h-full object-cover rounded-r-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-r-3xl"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="text-2xl font-semibold mb-2">Join Our Community</h4>
              <p className="text-sm">Stay connected and grow with us.</p>
              <div className='mt-4'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;