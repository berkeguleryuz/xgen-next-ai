"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Logo from "../Logo";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { name: "X", icon: FaXTwitter, href: "https://twitter.com/clodron" },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com/clodron",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com/company/clodron",
  },
  { name: "GitHub", icon: FaGithub, href: "https://github.com/clodron" },
];

const Footer = () => {
  return (
    <footer className="w-full py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-white/70 text-sm max-w-xs">
              Empowering creativity with AI. Generate, schedule, and manage your
              content with ease.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 group transition-colors duration-300">
                  <social.icon className="w-5 h-5 text-white/70 group-hover:text-lime-500 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-lime-500 transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-lime-500 transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-lime-500/50 focus:outline-none text-white text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors duration-300">
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/50 hover:text-lime-500 transition-colors duration-300 text-sm">
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Mail className="w-4 h-4" />
              <span>support@clodron.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
