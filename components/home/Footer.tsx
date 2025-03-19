"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "../Logo";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
    <footer className="w-full bg-black/40 backdrop-blur-sm border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
            <Logo />
            <p className="text-white/60 text-sm text-center md:text-left">
              Empowering creativity with AI. Generate, schedule, and manage your
              content with ease.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/5 group hover:bg-white/10 transition-all duration-300">
                <social.icon className="w-5 h-5 text-white/60 group-hover:text-lime-500 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2025 xGen. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-white/70 text-sm">
                Powered by{" "}
                <Link
                  href="https://clodron.com"
                  className="text-lime-500 hover:text-lime-400 transition-colors duration-300">
                  Clodron
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
