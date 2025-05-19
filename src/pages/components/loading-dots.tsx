import { cn } from "@/lib/utils"

export default function LoadingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-200 rounded-2xl px-4 py-2 rounded-bl-none flex items-center space-x-1">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={cn("h-2 w-2 rounded-full bg-gray-500 opacity-60", "animate-pulse")}
            style={{
              animationDelay: `${dot * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
