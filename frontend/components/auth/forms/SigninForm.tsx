"use client";

import Link from "next/link";
import { useState } from "react";

import { signIn } from "@/utils/auth-client";

import {
  AuthHeader,
  AuthInput,
  AuthButton,
  AuthDivider,
  GoogleButton,
  AuthSwitch,
} from "@/components/auth";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    setIsSubmitting(true);

    const res = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    setIsSubmitting(false);

    if (res.error) {
      alert(res.error.message);
      return;
    }

    setEmail("");
    setPassword("");
  };

  const handleGoogleSignin = async () => {
    setIsSubmitting(true);

    const res = await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });

    setIsSubmitting(false);

    if (res.error) {
      alert(res.error.message);
    }
  };

  return (
    <>
      <AuthHeader
        title="Welcome back."
        description="Continue where your conversations left off."
      />

      <form
        onSubmit={handleSignIn}
        className="mt-6 space-y-4"
      >
        <AuthInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@work-email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          action={
            <Link
              href="/forgot-password"
              className="text-xs text-[#7F621F] hover:text-[#A9822E]"
            >
              Forgot Password?
            </Link>
          }
        />

        <AuthButton
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </AuthButton>
      </form>

      <AuthDivider />

      <GoogleButton
        onClick={handleGoogleSignin}
        disabled={isSubmitting}
      />

      <AuthSwitch
        label="Don't have an account?"
        href="/signup"
        linkText="Create Account"
      />
    </>
  );
}