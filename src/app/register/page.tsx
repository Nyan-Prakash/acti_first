"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperPage } from "@/components/ui-desk";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center px-4 py-16 min-h-[80vh]">
      <PaperPage className="w-full max-w-md">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <div className="relative">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-2xl shadow-lg select-none"
                style={{ background: "linear-gradient(135deg, var(--desk-teal), #1f7a6f)" }}
              >
                ✦
              </div>
              <svg className="sparkle absolute -top-1.5 -right-1.5 w-3 h-3" viewBox="0 0 16 16" fill="var(--desk-accent)" aria-hidden>
                <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
              </svg>
              <svg className="sparkle absolute -bottom-1 -left-2 w-2.5 h-2.5" viewBox="0 0 16 16" fill="var(--desk-teal)" aria-hidden>
                <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
              </svg>
              <svg className="sparkle absolute top-1 -left-2.5 w-2 h-2" viewBox="0 0 16 16" fill="var(--desk-rose)" aria-hidden>
                <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
              </svg>
            </div>
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}
          >
            Create your account
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--desk-muted)" }}>
            Join educators saving planning time with Planboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              className="rounded-lg border px-4 py-3 text-sm"
              style={{ background: "#fef2f2", borderColor: "#fca5a5", color: "#b91c1c" }}
            >
              <strong>Heads up: </strong>{error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-semibold" style={{ color: "var(--desk-ink)" }}>
              Your name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ms. Johnson"
              required
              className="border-[var(--desk-border)] bg-[var(--desk-bg)]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-semibold" style={{ color: "var(--desk-ink)" }}>
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@school.edu"
              required
              className="border-[var(--desk-border)] bg-[var(--desk-bg)]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-semibold" style={{ color: "var(--desk-ink)" }}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="border-[var(--desk-border)] bg-[var(--desk-bg)]"
            />
            <p className="text-xs" style={{ color: "var(--desk-muted)" }}>
              Must be at least 6 characters
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[var(--desk-teal)] text-white hover:opacity-90 py-5 text-base"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--desk-muted)" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold underline-offset-2 hover:underline"
            style={{ color: "var(--desk-teal)" }}
          >
            Sign in
          </Link>
        </p>
      </PaperPage>
    </div>
  );
}
