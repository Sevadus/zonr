import { LocalDateTime } from "@/components/features/localDateTime";
import { Suspense } from "react";
export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LocalDateTime />
      </Suspense>
    </div>
  );
}
