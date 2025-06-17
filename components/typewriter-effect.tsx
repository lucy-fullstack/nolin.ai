"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const word = words[currentWordIndex].text

    const type = () => {
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1))
        setTypingSpeed(75)

        if (currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
          setTypingSpeed(150)
        }
      } else {
        setCurrentText((prev) => word.substring(0, prev.length + 1))

        if (currentText === word) {
          setTypingSpeed(2000) // Pause at the end of word
          setTimeout(() => {
            setIsDeleting(true)
            setTypingSpeed(75)
          }, 2000)
        }
      }
    }

    const timer = setTimeout(type, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words])

  return (
    <span className={cn("inline-block text-primary ml-2", className)}>
      {currentText}
      <span className={cn("ml-1 inline-block w-[4px] bg-primary animate-blink", cursorClassName)}>&nbsp;</span>
    </span>
  )
}
