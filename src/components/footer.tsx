"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/signin" || pathname === "/signup") return null;

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="বাজার দর হোম">
            <Image src="/assets/logo-icon.png" width={42} height={42} alt="" />
            <span>বাজার দর</span>
          </Link>
          <p>প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>

        <nav className="footer-links" aria-label="ফুটার নেভিগেশন">
          <Link href="/">হোম</Link>
          <Link href="/#all-products">সব পণ্য</Link>
          <Link href="/category/chal">চাল</Link>
          <Link href="/category/sobji">সবজি</Link>
          <Link href="/category/mach">মাছ</Link>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        <p>© ২০২৬ বাজার দর</p>
      </div>
    </footer>
  );
}
