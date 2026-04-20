"use client"
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Discord from '@/../public/discord.svg'
import Roblox from '@/../public/roblox.svg'
import Image from "next/image";

interface Profile {
  name: string;
  role: string;
  profile: string;
}

export default function Topbar() {
  const [me, setMe] = useState<Profile | null>(null);
  const [loginPage, setLoginPage] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get("/api/me");
        setMe(res.data.data);
      } catch { setMe(null); }
    }
    fetchMe();
  }, []);

  const directives = [
    { title: "Roadmap",   url: "/" },
    { title: "Feedback",  url: "/feedback" },
    { title: "Support",   url: "/support" },
    { title: "Changelog", url: "/changelog" },
  ];

  const initials = me?.name.split(" ").map((n) => n[0]).join("");

  const providers = [
    {
      label: "Sign in with Discord",
      icon: Discord,
      href: "/api/auth/discord",
      className: "bg-[#5865F2] hover:bg-[#4752C4] text-white",
    },
    {
      label: "Sign in with Roblox",
      icon: Roblox,
      href: "/api/auth/roblox",
      className: "bg-[#1446FF] hover:bg-[#1239c9] text-white",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between h-13 px-6 bg-white dark:bg-[#0a0a0a] border-b border-neutral-100 dark:border-neutral-800/60 transition-colors">
        <Link href="/" className="no-underline">
          <img src="/branding.svg" className="h-5" alt="Insight" />
        </Link>

        <nav className="sm:flex items-center none hidden">
          {directives.map((link, i) => {
            const active = pathname === link.url;
            return (
              <Link
                key={i}
                href={link.url}
                className={`text-[13px] px-3.5 py-1.5 no-underline transition-colors whitespace-nowrap
                  ${active
                    ? "text-black dark:text-white"
                    : "text-neutral-400 dark:text-neutral-600 hover:text-black dark:hover:text-white"
                  }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {me == null ? (
            <button
              onClick={() => setLoginPage(true)}
              className="text-[12px] font-medium text-white dark:text-black bg-black dark:bg-white hover:opacity-70 border border-black dark:border-white px-4 py-1.5 rounded-md transition-opacity"
            >
              Sign in
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
                {me.name}
              </span>
              <div className="w-6.5 h-6.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[11px] font-medium text-black dark:text-white overflow-hidden">
                {me.profile
                  ? <img src={me.profile} className="w-full h-full object-cover" alt={me.name} />
                  : initials}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {loginPage && (
          <Dialog
            static
            open={loginPage}
            onClose={() => setLoginPage(false)}
            className="relative z-50"
          >
            <motion.div
              className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel as="div">
                <motion.div
                  className="w-full max-w-sm rounded-xl bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 shadow-xl p-6 space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="space-y-1">
                    <DialogTitle className="text-[15px] font-semibold text-black dark:text-white">
                      Sign in to Insight
                    </DialogTitle>
                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                      Choose a provider to continue.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {providers.map(({ label, icon, href, className }) => (
                      <a
                        key={label}
                        href={href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors no-underline justify-center ${className}`}
                      >
                        <Image src={icon} alt="" className="w-5 h-5" />
                        {label}
                      </a>
                    ))}
                  </div>

                  <p className="text-[11px] text-neutral-400 dark:text-neutral-600 text-center pt-1">
                    By signing in you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">
                      Terms of Service
                    </Link>
                  </p>
                </motion.div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}