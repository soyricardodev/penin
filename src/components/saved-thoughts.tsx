import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	PlusCircle,
	Trash2,
	Calendar,
	Clock,
	Search,
	FileText,
	AlertCircle,
	ArrowRight,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllThoughts, deleteThought, type SavedThought } from "@/lib/db";
import { ThoughtDetail } from "./thought-detail";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface SavedThoughtsProps {
	onNewThought: () => void;
}

export function SavedThoughts({ onNewThought }: SavedThoughtsProps) {
	const [thoughts, setThoughts] = useState<SavedThought[]>([]);
	const [filteredThoughts, setFilteredThoughts] = useState<SavedThought[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedThought, setSelectedThought] = useState<SavedThought | null>(
		null,
	);
	const [thoughtToDelete, setThoughtToDelete] = useState<number | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	// Load thoughts immediately on component mount
	useEffect(() => {
		loadThoughts();
	}, []);

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredThoughts(thoughts);
		} else {
			const query = searchQuery.toLowerCase();
			setFilteredThoughts(
				thoughts.filter(
					(thought) =>
						thought.thought.toLowerCase().includes(query) ||
						thought.feeling.toLowerCase().includes(query) ||
						thought.origin.toLowerCase().includes(query) ||
						thought.alternative.toLowerCase().includes(query),
				),
			);
		}
	}, [searchQuery, thoughts]);

	const loadThoughts = async () => {
		try {
			const allThoughts = await getAllThoughts();
			setThoughts(allThoughts);
			setFilteredThoughts(allThoughts);
		} catch (error) {
			toast.error("Error al cargar pensamientos", {
				description: "No se pudieron cargar tus pensamientos guardados.",
			});
		}
	};

	const handleDeleteThought = async () => {
		if (!thoughtToDelete) return;

		try {
			await deleteThought(thoughtToDelete);
			setThoughts(thoughts.filter((thought) => thought.id !== thoughtToDelete));
			toast.success("Pensamiento eliminado", {
				description: "El pensamiento ha sido eliminado correctamente.",
			});
		} catch (error) {
			toast.error("Error al eliminar", {
				description: "No se pudo eliminar el pensamiento. Inténtalo de nuevo.",
			});
		} finally {
			setThoughtToDelete(null);
			setIsDeleteDialogOpen(false);
		}
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("es-ES", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}).format(date);
	};

	const formatTime = (date: Date) => {
		return new Intl.DateTimeFormat("es-ES", {
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	return (
		<div className="space-y-4 relative">
			<div className="blob-bg blob-animation" />

			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold gradient-text">Historial</h2>
				<Button
					onClick={onNewThought}
					variant="outline"
					size="sm"
					className="rounded-lg group"
					aria-label="Crear nuevo pensamiento"
				>
					<PlusCircle className="h-4 w-4 mr-2" />
					Nuevo
				</Button>
			</div>

			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
				<Input
					placeholder="Buscar pensamientos..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pl-9 rounded-lg"
					aria-label="Buscar pensamientos"
				/>
			</div>

			{filteredThoughts.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col items-center justify-center py-12 text-center"
					aria-live="polite"
				>
					{thoughts.length === 0 ? (
						<>
							<FileText
								className="h-12 w-12 text-muted-foreground mb-4"
								aria-hidden="true"
							/>
							<h3 className="text-lg font-medium mb-2">
								No hay pensamientos guardados
							</h3>
							<p className="text-muted-foreground mb-4">
								Comienza a procesar y guardar tus pensamientos para verlos aquí.
							</p>
							<Button
								onClick={onNewThought}
								className="rounded-lg group"
								aria-label="Crear nuevo pensamiento"
							>
								<PlusCircle className="h-4 w-4 mr-2" aria-hidden="true" />
								Crear nuevo pensamiento
								<ArrowRight
									className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
									aria-hidden="true"
								/>
							</Button>
						</>
					) : (
						<>
							<AlertCircle
								className="h-12 w-12 text-muted-foreground mb-4"
								aria-hidden="true"
							/>
							<h3 className="text-lg font-medium mb-2">
								No se encontraron resultados
							</h3>
							<p className="text-muted-foreground">
								No hay pensamientos que coincidan con tu búsqueda.
							</p>
						</>
					)}
				</motion.div>
			) : (
				<Card className="rounded-lg overflow-hidden card-glow">
					<ScrollArea className="h-[400px]">
						<CardContent className="p-0">
							{filteredThoughts.map((thought, index) => (
								<motion.div
									key={thought.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									className="p-4 border-b last:border-b-0 hover:bg-accent/50 transition-colors"
								>
									<div className="flex justify-between items-start">
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													className="p-0 h-auto text-left justify-start hover:bg-transparent"
													onClick={() => setSelectedThought(thought)}
													aria-label={`Ver detalles de pensamiento: ${thought.thought.substring(0, 50)}`}
												>
													<div className="truncate max-w-[250px]">
														<h3 className="font-medium text-base truncate">
															{thought.thought.length > 50
																? `${thought.thought.substring(0, 50)}...`
																: thought.thought}
														</h3>
														<div className="flex items-center text-xs text-muted-foreground mt-1">
															<Calendar
																className="h-3 w-3 mr-1"
																aria-hidden="true"
															/>
															<span>
																{formatDate(new Date(thought.savedAt))}
															</span>
															<Clock
																className="h-3 w-3 ml-2 mr-1"
																aria-hidden="true"
															/>
															<span>
																{formatTime(new Date(thought.savedAt))}
															</span>
														</div>
													</div>
												</Button>
											</DialogTrigger>
											<DialogContent className="sm:max-w-md">
												<DialogHeader>
													<DialogTitle>Detalle del pensamiento</DialogTitle>
												</DialogHeader>
												{selectedThought && (
													<ThoughtDetail thought={selectedThought} />
												)}
											</DialogContent>
										</Dialog>

										<AlertDialog
											open={
												isDeleteDialogOpen && thoughtToDelete === thought.id
											}
											onOpenChange={(open) => {
												setIsDeleteDialogOpen(open);
												if (!open) setThoughtToDelete(null);
											}}
										>
											<AlertDialogTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-muted-foreground hover:text-destructive"
													onClick={() => {
														setThoughtToDelete(thought.id ?? null);
														setIsDeleteDialogOpen(true);
													}}
													aria-label="Eliminar pensamiento"
												>
													<Trash2 className="h-4 w-4" aria-hidden="true" />
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
													<AlertDialogDescription>
														Esta acción no se puede deshacer. Esto eliminará
														permanentemente este pensamiento de tu historial.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancelar</AlertDialogCancel>
													<AlertDialogAction
														onClick={handleDeleteThought}
														className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
													>
														Eliminar
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</motion.div>
							))}
						</CardContent>
					</ScrollArea>
				</Card>
			)}
		</div>
	);
}
