"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <footer
      className={`site-footer${isAuthPage ? " footer-hidden" : ""}`}
      aria-hidden={isAuthPage}
    >
      <div className="container footer-simple">
        <p>
          <b>বাজার দর:</b> প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
