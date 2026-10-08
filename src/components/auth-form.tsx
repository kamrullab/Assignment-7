"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="auth-card">
      <div className="auth-logo">🛒</div>
      <p className="kicker">বাজার দর</p>
      <h1>{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</h1>
      <p>
        {signup
          ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
          : "বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
      </p>
      <form onSubmit={submit}>
        {signup && (
          <label>
            নাম
            <input name="name" required placeholder="আপনার নাম" />
          </label>
        )}
        <label>
          ইমেইল
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </label>
        <label>
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            minLength={8}
            required
            placeholder="কমপক্ষে ৮ অক্ষর"
          />
        </label>
        <button className="btn primary" disabled={loading}>
          {loading
            ? "অপেক্ষা করুন..."
            : signup
              ? "সাইন আপ করুন"
              : "সাইন ইন করুন"}
        </button>
      </form>
      <div className="or">
        <span>অথবা</span>
      </div>
      <div className="socials">
        <button onClick={() => social("google")}>
          G　Google দিয়ে চালিয়ে যান
        </button>
        <button onClick={() => social("github")}>
          ◉　GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
      <p className="auth-link">
        {signup ? "অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
        <Link href={signup ? "/signin" : "/signup"}>
          {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>
    </div>
  );
}
