import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-[4rem]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shrisant Academy</h3>
            <p className="text-sm text-gray-400 mb-4">
              Empowering minds through quality education. We are dedicated to providing accessible and transformative learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaLinkedin size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Courses</a></li>
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-400 flex items-center">
                <FaEnvelope className="mr-2" /> info@shrisantacademy.com
              </p>
              <p className="text-sm text-gray-400 flex items-center">
                <FaPhone className="mr-2" /> +1 (123) 456-7890
              </p>
              <p className="text-sm text-gray-400">
                123 Learning Street, Cityville, State, 12345
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Shrisant Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;