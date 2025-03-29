import Link from "next/link";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
export default function CollectionLayout({ children }) {
  return (
    <div className="px-4 py-1 ">
      <div>
  <Button className="bg-[#e5e5e5] hover:bg-[#e5e5e5]/90 text-[#b33a3a] px-4 py-2 text-sm h-auto">
    <Link href="/dashboard" className="flex items-center gap-1">
      ← Back to Dashboard
    </Link>
  </Button>
</div>
      <Suspense fallback={<BarLoader color="#b33a3a" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
}