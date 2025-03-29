import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default function EntryLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-[#b33a3a] hover:text-[#b33a3a]/80 "
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}