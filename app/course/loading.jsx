import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-sm">
      <Spinner />
    </div>
  );
}
