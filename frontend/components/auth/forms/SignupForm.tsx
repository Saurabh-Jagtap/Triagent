"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn, signUp } from "@/utils/auth-client";

import {
  AuthHeader,
  AuthInput,
  AuthButton,
  AuthDivider,
  GoogleButton,
  AuthSwitch,
} from "@/components/auth";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await signUp.email({
        name,
        email,
        password,
        callbackURL: "/signin",
      });

      router.push(
        `/verify-email?type=verify&email=${encodeURIComponent(
          email
        )}`
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
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
        title="Create your workspace."
        description="Start using Triagent to manage email, meetings, and follow-ups while staying in complete control."
      />

      <form
        onSubmit={handleSignup}
        className="mt-8 space-y-5"
      >
        <AuthInput
          id="name"
          label="Full Name"
          placeholder="Jordan Ellis"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
        />

        <AuthInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <AuthButton
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </AuthButton>
      </form>

      <AuthDivider />

      <GoogleButton
        onClick={handleGoogleSignup}
        disabled={isSubmitting}
      />

      <AuthSwitch
        label="Already have an account?"
        href="/signin"
        linkText="Sign In"
      />
    </>
  );
}