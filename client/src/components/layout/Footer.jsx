import React from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn
} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0f0f0f] text-gray-700 dark:text-gray-300 pt-12 pb-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-5 text-[#0070F3] dark:text-[#00FF87]">Company</h3>
                    <ul className="space-y-3 text-sm">
                        <FooterLink href="/about" label="About Us" />
                        <FooterLink href="/contact" label="Contact" />
                        <FooterLink href="/careers" label="Careers" />
                        <FooterLink href="/privacy" label="Privacy Policy" />
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-xl font-semibold mb-5 text-[#0070F3] dark:text-[#00FF87]">Support</h3>
                    <ul className="space-y-3 text-sm">
                        <FooterLink href="/faq" label="FAQs" />
                        <FooterLink href="/returns" label="Returns & Exchanges" />
                        <FooterLink href="/shipping" label="Shipping Info" />
                        <FooterLink href="/order-tracking" label="Order Tracking" />
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold mb-5 text-[#0070F3] dark:text-[#00FF87]">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                        <SocialIcon href="https://facebook.com" icon={<FaFacebookF />} color="hover:text-[#0070F3] dark:hover:text-[#00FF87]" />
                        <SocialIcon href="https://twitter.com" icon={<FaTwitter />} color="hover:text-[#0070F3] dark:hover:text-[#00FF87]" />
                        <SocialIcon href="https://instagram.com" icon={<FaInstagram />} color="hover:text-[#0070F3] dark:hover:text-[#00FF87]" />
                        <SocialIcon href="https://linkedin.com" icon={<FaLinkedinIn />} color="hover:text-[#0070F3] dark:hover:text-[#00FF87]" />
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-xl font-semibold mb-5 text-[#0070F3] dark:text-[#00FF87]">Newsletter</h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Subscribe to get the latest updates on sports gear, deals & more.</p>
                    <form className="space-y-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-2.5 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0070F3] dark:focus:ring-[#00FF87] text-sm"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#0070F3] dark:bg-[#00FF87] hover:bg-blue-700 dark:hover:bg-emerald-400 text-white font-semibold py-2.5 rounded-md transition text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-6">
                &copy; {new Date().getFullYear()} SportCart. All rights reserved.
            </div>
        </footer>
    );
}

/** 🔗 Reusable Link Component */
const FooterLink = ({ href, label }) => (
    <li>
        <a
            href={href}
            className="hover:text-[#0070F3] dark:hover:text-[#00FF87] transition-colors duration-150"
        >
            {label}
        </a>
    </li>
);

/** 🌐 Social Icon Component */
const SocialIcon = ({ href, icon, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-xl text-gray-600 dark:text-gray-400 ${color} transition duration-200`}
    >
        {icon}
    </a>
);