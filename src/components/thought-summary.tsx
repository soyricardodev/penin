""

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  RefreshCw,
  ThumbsUp,
  Lightbulb,
  Sparkles,
  Heart,
  Compass,
  CheckCircle,
  Save,
  Check,
  ArrowRight,
} from "lucide-react"
import type { ThoughtData } from "./thought-processor"
import { saveThought } from "@/lib/db"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface ThoughtSummaryProps {
  thoughtData: ThoughtData
  onReset: () => void
  onSave?: () => void
}

export function ThoughtSummary({ thoughtData, onReset, onSave }: ThoughtSummaryProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const getAlternativeThinking = () => {
    if (thoughtData.alternative) return thoughtData.alternative

    if (thoughtData.isTrue === "no") {
      return "Este pensamiento no es verdadero. Puedes practicar reconocer cuando aparece y recordarte a ti mismo que no refleja la realidad."
    }

    if (thoughtData.isTrue === "parcialmente") {
      return "Este pensamiento contiene algunas verdades, pero también distorsiones. Intenta separar los hechos de las interpretaciones."
    }

    return "Considera cómo podrías reformular este pensamiento de una manera más constructiva y realista."
  }

  const getNextSteps = () => {
    const steps = [
      "Practica la atención plena para observar tus pensamientos sin juzgarlos.",
      "Cuando notes este pensamiento, etiquétalo como 'solo un pensamiento'.",
      "Respira profundamente y recuerda que los pensamientos no son hechos.",
      "Escribe tus pensamientos en un diario para ganar perspectiva.",
      "Habla con alguien de confianza sobre estos pensamientos.",
      "Realiza actividades que te ayuden a distraerte de estos pensamientos.",
      "Practica ejercicios de relajación cuando aparezcan estos pensamientos.",
      "Identifica patrones o desencadenantes de estos pensamientos.",
    ]

    // Selecciona 3 pasos aleatorios
    return steps.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  const handleSaveThought = async () => {
    setIsSaving(true)
    try {
      await saveThought(thoughtData)
      setIsSaved(true)
      toast({
        title: "Pensamiento guardado",
        description: "Tu pensamiento ha sido guardado correctamente.",
      })
      if (onSave) {
        setTimeout(() => {
          onSave()
        }, 1000)
      }
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar el pensamiento. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 relative">
      <div className="blob-bg blob-animation"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-center gradient-text">Resumen</h2>
        </div>
        <p className="text-muted-foreground text-center">Análisis de tu pensamiento intrusivo</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden rounded-lg border-muted card-glow">
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tu pensamiento:</h3>
              <p className="italic">{thoughtData.thought}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5" aria-hidden="true">
                  <CheckCircle className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">¿Es verdadero?</h3>
                  <p className="capitalize">{thoughtData.isTrue}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5" aria-hidden="true">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Escala de verdad:</h3>
                  <p>{thoughtData.truthScale}/10</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5" aria-hidden="true">
                <Heart className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cómo te hace sentir:</h3>
                <p>{thoughtData.feeling}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5" aria-hidden="true">
                <Compass className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Origen del pensamiento:</h3>
                <p>{thoughtData.origin}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full" aria-hidden="true">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Pensamiento alternativo</h3>
        </div>
        <p className="text-sm">{getAlternativeThinking()}</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full" aria-hidden="true">
            <ThumbsUp className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Próximos pasos</h3>
        </div>
        <ul className="space-y-3 text-sm">
          {getNextSteps().map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <span
                className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onReset} variant="outline" className="rounded-lg group" aria-label="Crear nuevo pensamiento">
          <ArrowRight
            className="mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Nuevo
        </Button>
        <Button
          onClick={handleSaveThought}
          className="rounded-lg group"
          disabled={isSaving || isSaved}
          aria-label={isSaving ? "Guardando pensamiento..." : isSaved ? "Pensamiento guardado" : "Guardar pensamiento"}
        >
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Guardando...
            </>
          ) : isSaved ? (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              Guardado
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              Guardar
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
