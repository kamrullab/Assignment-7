"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const name = String(fd.get("name") ?? "");

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const result = signup
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    setLoading(false);

    if (result.error) {
      toast.error(result.error.message || "আবার চেষ্টা করুন");
      return;
    }

    toast.success(
      signup
        ? "অ্যাকাউন্ট তৈরি হয়েছে—এখন সাইন ইন করুন"
        : "সফলভাবে সাইন ইন হয়েছে",
    );
    router.push(signup ? "/signin" : "/");
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  }

  return (
    <div className="auth-shell">
      <aside className="auth-promo">
        <span className="auth-promo-mark">🛒</span>
        <span className="auth-promo-label">বিশ্বস্ত বাজার তথ্য</span>
        <h2>প্রতিদিনের বাজারদর এখন হাতের মুঠোয়</h2>
        <p>
          দেশের বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম তুলনা করে সঠিক
          সিদ্ধান্ত নিন।
        </p>
        <div className="auth-benefits">
          <span>
            <ShieldCheck /> নিরাপদ অ্যাকাউন্ট
          </span>
          <span>
            <span className="benefit-icon">৳</span> বাজারভিত্তিক দাম
          </span>
          <span>
            <span className="benefit-icon">↗</span> দৈনিক পরিবর্তন
          </span>
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-mobile-logo">🛒</span>
          <p className="kicker">বাজার দর</p>
          <h1>{signup ? "নতুন অ্যাকাউন্ট" : "স্বাগতম"}</h1>
          <p>
            {signup
              ? "বাজারের বিস্তারিত তথ্য দেখতে বিনামূল্যে নিবন্ধন করুন।"
              : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}
          </p>
        </div>

        <form onSubmit={submit}>
          {signup && (
            <label>
              <span>নাম</span>
              <div className="input-wrap">
                <UserRound aria-hidden="true" />
                <input name="name" required placeholder="আপনার পূর্ণ নাম" />
              </div>
            </label>
          )}
          <label>
            <span>ইমেইল</span>
            <div className="input-wrap">
              <Mail aria-hidden="true" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
          </label>
          <label>
            <span>পাসওয়ার্ড</span>
            <div className="input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                name="password"
                type="password"
                minLength={8}
                required
                autoComplete={signup ? "new-password" : "current-password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
            </div>
          </label>
          <button className="btn primary auth-submit" disabled={loading}>
            {loading
              ? "অপেক্ষা করুন..."
              : signup
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন করুন"}
          </button>
        </form>

        <div className="or">
          <span>অথবা</span>
        </div>
        <div className="socials">
          <button type="button" onClick={() => social("google")}>
            <span className="google-mark">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button type="button" onClick={() => social("github")}>
            <span className="github-mark" aria-hidden="true">
              GH
            </span>{" "}
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>
        <p className="auth-link">
          {signup ? "আগেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link href={signup ? "/signin" : "/signup"}>
            {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>
    </div>
  );
}
