"use client"
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
  name: string;
  role: string;
  profile: string;
}

export default function Topbar() {
  const [me, setMe] = useState<Profile | null>(null);
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

  return (
    <div className="flex items-center justify-between h-13 px-6 bg-white dark:bg-[#0a0a0a] border-b border-neutral-100 dark:border-neutral-800/60 transition-colors">

      <Link href="/" className="no-underline">
        <img src="/branding.svg" className="h-5" alt="Firefli" />
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
          <button className="text-[12px] font-medium text-white dark:text-black bg-black dark:bg-white hover:opacity-70 border border-black dark:border-white px-4 py-1.5 rounded-md transition-opacity">
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
  );
}