import { useState } from "react"
import { ThoughtInput } from "./thought-input"
import { Questionnaire } from "./questionnaire"
import { ThoughtSummary } from "./thought-summary"
import { Card } from "@/components/ui/card"

export type ThoughtData = {
  thought: string
  isTrue: string
  truthScale: number
  feeling: string
  origin: string
  alternative: string
}

interface ThoughtProcessorProps {
  onThoughtSaved?: () => void
}

export function ThoughtProcessor({ onThoughtSaved }: ThoughtProcessorProps) {
  const [step, setStep] = useState<"input" | "questions" | "summary">("input")
  const [thoughtData, setThoughtData] = useState<ThoughtData>({
    thought: "",
    isTrue: "",
    truthScale: 5,
    feeling: "",
    origin: "",
    alternative: "",
  })
  const [animationClass, setAnimationClass] = useState("fade-in")

  const handleThoughtSubmit = (thought: string) => {
    setThoughtData({ ...thoughtData, thought })
    animateTransition("questions")
  }

  const handleQuestionnaireComplete = (answers: Omit<ThoughtData, "thought">) => {
    setThoughtData({ ...thoughtData, ...answers })
    animateTransition("summary")
  }

  const handleReset = () => {
    setAnimationClass("slide-out")
    setTimeout(() => {
      setThoughtData({
        thought: "",
        isTrue: "",
        truthScale: 5,
        feeling: "",
        origin: "",
        alternative: "",
      })
      setStep("input")
      setAnimationClass("scale-in")
    }, 300)
  }

  const animateTransition = (nextStep: "input" | "questions" | "summary") => {
    setAnimationClass("slide-out")
    setTimeout(() => {
      setStep(nextStep)
      setAnimationClass("slide-in")
    }, 300)
  }

  return (
    <Card className="w-full card-shadow rounded-xl overflow-hidden">
      <div className={`${animationClass} p-6`}>
        {step === "input" && <ThoughtInput onSubmit={handleThoughtSubmit} />}
        {step === "questions" && (
          <Questionnaire thought={thoughtData.thought} onComplete={handleQuestionnaireComplete} />
        )}
        {step === "summary" && (
          <ThoughtSummary thoughtData={thoughtData} onReset={handleReset} onSave={onThoughtSaved} />
        )}
      </div>
    </Card>
  )
}
