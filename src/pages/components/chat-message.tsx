import { cn } from "@/lib/utils"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none",
        )}
      >
        <p className="break-words">{message.text}</p>
      </div>
    </div>
  )
}
