"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600 text-white font-bold text-sm">
            AG
          </div>
          <span className="text-xl font-bold text-gray-900">ACTi Genie</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/wizard/step-1">
            <Button size="sm">Create Activity</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
