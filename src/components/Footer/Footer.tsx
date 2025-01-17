import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-auto w-full px-10">
      <div className="container mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Galactic Pet Adoption</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Finding loving homes for intergalactic companions across the universe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/care-guides" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  Pet Care Guides
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  Interstellar Shipping
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-300">
                Alpha Centauri Branch Office
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-300">
                contact@galacticpets.universe
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-300">
                Quantum Comm: +000-SPACE-PETS
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {currentYear} Galactic Pet Adoption Portal. All rights reserved across the universe.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;