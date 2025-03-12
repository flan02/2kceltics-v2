import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUserCard() {
  return (
    <div className="flex flex-col rounded-lg">
      <Skeleton className="w-full h-[155px] rounded-xl" />
    </div>
  )
}
