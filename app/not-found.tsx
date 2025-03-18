"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bot, Home, RefreshCw } from "lucide-react";

const funnyMessages = [
  "Oops! Looks like this page took a vacation 🏖️",
  "Houston, we have a problem! Page not found 🚀",
  "This page is playing hide and seek (and winning!) 🙈",
  "404: Page got lost in the matrix 🕴️",
  "Looks like you've reached the edge of the internet 🌍",
];

const NotFound = () => {
  const [message, setMessage] = useState(funnyMessages[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [count, setCount] = useState(0);

  const changeMessage = () => {
    setIsSpinning(true);
    setCount((prev) => prev + 1);
    const nextIndex =
      (funnyMessages.indexOf(message) + 1) % funnyMessages.length;
    setTimeout(() => {
      setMessage(funnyMessages[nextIndex]);
      setIsSpinning(false);
    }, 500);
  };

  useEffect(() => {
    if (count === 10) {
      setMessage("Wow, you really like clicking that button! 🎯");
    }
  }, [count]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-lime-500 to-lime-200 text-transparent bg-clip-text">
              404
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-medium text-white/90">
                {message}
              </motion.p>
            </AnimatePresence>

            <motion.div
              animate={{ rotate: isSpinning ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto">
              <Bot className="w-full h-full text-lime-500" strokeWidth={1.5} />
            </motion.div>

            <div className="flex items-center justify-center gap-4 pt-8">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-lime-500 text-white rounded-lg font-medium hover:bg-lime-600 transition-colors duration-300 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Go Home
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={changeMessage}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 flex items-center gap-2 group">
                <RefreshCw
                  className={`w-5 h-5 ${
                    isSpinning ? "animate-spin" : ""
                  } group-hover:text-lime-500`}
                />
                Try Again
              </motion.button>
            </div>

            {count > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/50 text-sm">
                You&apos;ve clicked {count} times...{" "}
                {count >= 10 ? "You found an easter egg! 🥚" : "Keep going! 👀"}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
