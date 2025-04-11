import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Compass, Lightbulb, Calendar, Clock } from "lucide-react"
import type { SavedThought } from "@/lib/db"

interface ThoughtDetailProps {
  thought: SavedThought
}

export function ThoughtDetail({ thought }: ThoughtDetailProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{formatDate(new Date(thought.savedAt))}</span>
        <Clock className="h-4 w-4 ml-3 mr-1" />
        <span>{formatTime(new Date(thought.savedAt))}</span>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Pensamiento:</h3>
        <p className="italic">{thought.thought}</p>
      </div>

      <Card className="overflow-hidden rounded-lg border-muted">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">¿Es verdadero?</h3>
                <p className="capitalize">{thought.isTrue}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                <Compass className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Escala de verdad:</h3>
                <p>{thought.truthScale}/10</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-0.5">
              <Heart className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Cómo te hace sentir:</h3>
              <p>{thought.feeling}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-0.5">
              <Compass className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Origen del pensamiento:</h3>
              <p>{thought.origin}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-0.5">
              <Lightbulb className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Pensamiento alternativo:</h3>
              <p>{thought.alternative}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
