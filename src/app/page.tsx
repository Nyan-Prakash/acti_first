import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 text-white font-bold text-3xl shadow-lg">
            AG
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">
          ACTi Genie
        </h1>
        <p className="mb-2 text-xl text-gray-600">
          AI-Powered Activity Generator for Teachers
        </p>
        <p className="mb-8 text-lg text-gray-500 max-w-xl mx-auto">
          Generate engaging classroom activities from your lesson information.
          Select your grade level and subject, input your lesson details, and get
          instant AI-generated activity suggestions with implementation guides.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/wizard/step-1">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-3 text-3xl">1</div>
            <h3 className="mb-2 font-semibold text-gray-900">
              Select Grade & Subject
            </h3>
            <p className="text-sm text-gray-500">
              Choose your target age group and subject matter to get tailored
              activities.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-3 text-3xl">2</div>
            <h3 className="mb-2 font-semibold text-gray-900">
              Input Lesson Details
            </h3>
            <p className="text-sm text-gray-500">
              Provide your lesson information and learning objectives for
              context.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-3 text-3xl">3</div>
            <h3 className="mb-2 font-semibold text-gray-900">
              Get AI Activities
            </h3>
            <p className="text-sm text-gray-500">
              Receive multiple activity suggestions with detailed implementation
              instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
