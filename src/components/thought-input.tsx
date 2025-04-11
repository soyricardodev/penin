""

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SparklesIcon, LightbulbIcon, FeatherIcon, BrainIcon, ArrowRightIcon } from "lucide-react"
import { motion } from "framer-motion"

interface ThoughtInputProps {
  onSubmit: (thought: string) => void
}

export function ThoughtInput({ onSubmit }: ThoughtInputProps) {
  const [thought, setThought] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Staggered animation for steps
    const staggerItems = document.querySelectorAll(".stagger-item")
    staggerItems.forEach((item, index) => {
      setTimeout(
        () => {
          item.classList.add("stagger-appear")
        },
        300 + index * 150,
      )
    })

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setIsReady(thought.trim().length > 0)
  }, [thought])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThought(e.target.value)
    setIsTyping(true)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (thought.trim()) {
      onSubmit(thought)
    }
  }

  return (
    <div className="space-y-8 relative">
      <div className="blob-bg blob-animation"></div>

      <div className="space-y-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full"
          aria-hidden="true"
        >
          <SparklesIcon className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl font-semibold gradient-text"
        >
          Bienvenido a PENIN
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground"
        >
          Escribe tu pensamiento intrusivo para comenzar a procesarlo
        </motion.p>
      </div>

      <div className="grid grid-cols-3 gap-4 my-8">
        <div className="flex flex-col items-center text-center space-y-2 stagger-item scale-hover">
          <div className="bg-primary/10 p-3 rounded-full" aria-hidden="true">
            <FeatherIcon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Escribe tu pensamiento</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2 stagger-item scale-hover">
          <div className="bg-primary/10 p-3 rounded-full" aria-hidden="true">
            <LightbulbIcon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Responde preguntas</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2 stagger-item scale-hover">
          <div className="bg-primary/10 p-3 rounded-full" aria-hidden="true">
            <BrainIcon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Obtén perspectivas</p>
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div
          className={`relative rounded-xl transition-all duration-300 ${isTyping ? "ring-2 ring-primary/50 shadow-lg" : "shadow"}`}
        >
          <div className={`absolute inset-0 rounded-xl ${isTyping ? "shimmer" : ""} pointer-events-none`}></div>

          <Textarea
            value={thought}
            onChange={handleTextChange}
            className="min-h-[150px] resize-none rounded-xl border-muted focus:border-primary focus:ring-primary transition-all duration-300 relative z-10"
            placeholder="Escribe aquí tu pensamiento..."
            aria-label="Escribe tu pensamiento intrusivo"
          />
        </div>

        <div className="flex items-center justify-end">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isReady ? 1 : 0.9, opacity: isReady ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              type="submit"
              className="rounded-lg group"
              disabled={!thought.trim()}
              aria-label="Continuar al siguiente paso"
            >
              <span className="mr-2">Continuar</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  )
}
