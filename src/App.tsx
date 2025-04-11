import { useState } from "react"
import { Header } from "@/components/header"
import { ThoughtProcessor } from "@/components/thought-processor"
import { SavedThoughts } from "@/components/saved-thoughts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, History } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("new")

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6 gradient-bg">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <Header />
        </div>

        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Nuevo</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Historial</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-0">
            <ThoughtProcessor onThoughtSaved={() => setActiveTab("saved")} />
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <SavedThoughts onNewThought={() => setActiveTab("new")} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
