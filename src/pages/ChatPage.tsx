"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
// import LoadingDots from "../components/loading-dots"
// import ChatMessage from "../components/chat-message"
import LoadingDots from "./components/loading-dots"
import ChatMessage from "./components/chat-message"
import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// Define message type
type Message = {
  id: string
  text: string
  sender: "user" | "bot"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I am Echobot. I will echo back anything you send me.",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // API endpoint - replace with your deployed backend URL
  const API_URL = "https://dbd5c9e8-9475-46c5-9d50-da9fabd5380a-00-1q0lkb3gn9e0o.pike.replit.dev/chat"

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Don't send empty messages
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      })

      const data = await response.json()

      // Add bot response after a small delay to simulate typing
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: "bot",
        }
        setMessages((prev) => [...prev, botMessage])
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I had trouble connecting. Please try again.",
          sender: "bot",
        }
        setMessages((prev) => [...prev, errorMessage])
        setIsLoading(false)
      }, 500)
    }
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm py-4 px-4 border-b">
        <h1 className="text-xl font-semibold text-center text-gray-800">Echobot</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <LoadingDots />}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t bg-white p-4 flex items-center justify-center gap-2">
        <div className="w-full" >
          <Input
            id="chat"
            name="chat"
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            className="w-full md:w-[30em]" 
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </main>
  )
}
