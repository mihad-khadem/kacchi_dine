"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Send,
  Sun,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              Stay Connected
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12  backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1  top-1 h-8 w-8 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-yellow-200/30 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Menu", href: "/menu" },
                { name: "Branches", href: "/branches" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block transition-colors hover:text-yellow-400"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Kacchi Dine Head Office</p>
              <p>Agrabad Commercial Area, Agrabad, Chattogram, Bangladesh</p>
              <p>Phone: +8801711-123456</p>
              <p>Email: info@kacchidine.com</p>
            </address>
          </div>

          {/* Social & Dark Mode */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Follow us on Facebook</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Follow us on Twitter</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Follow us on Instagram</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Connect with us on LinkedIn</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Kacchi Dine. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            {[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms of Service", href: "/terms-of-service" },
              { name: "Cookie Settings", href: "/cookie-settings" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-yellow-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Floating Chat */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-yellow-400 text-black hover:bg-yellow-500"
      >
        {isChatOpen ? "Close Chat" : "Open Chat"}
      </Button>
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 rounded-lg border bg-white dark:bg-gray-800 p-4 shadow-lg">
          <h4 className="mb-4 text-lg font-semibold">Live Chat</h4>
          <div className="mb-4 h-40 overflow-y-auto rounded border p-2">
            <p className="mb-2">
              <strong>Support:</strong> Hello! How can I assist you today?
            </p>
          </div>
          <form className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      )}
    </footer>
  );
}
