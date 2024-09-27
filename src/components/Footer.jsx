import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-gray-400">
            Website Gudang Naufal adalah sumber utama Anda untuk informasi
            terkini mengenai penyimpanan dan pengelolaan barang. Kami
            menyediakan informasi akurat, tidak bias, dan komprehensif mengenai
            berbagai aspek manajemen gudang dan logistik.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <form>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded"
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 mb-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-[#B37201] text-white py-2 px-4 rounded hover:bg-[#925a00]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <div className="flex justify-center mb-4 space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://wa.me/081211783201"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
        <div className="text-center text-gray-400">
          <p>Contact Us: bluenaufal7@gmail.com | Phone: +62 8121 1783 201</p>
          <p>&copy; Gudang Website Naufal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
