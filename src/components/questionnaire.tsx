"";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
	CheckIcon,
	HelpCircleIcon,
	ScaleIcon,
	HeartIcon,
	CompassIcon,
	LightbulbIcon,
	ArrowLeft,
	ArrowRightIcon,
} from "lucide-react";
import type { ThoughtData } from "./thought-processor";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionnaireProps {
	thought: string;
	onComplete: (answers: Omit<ThoughtData, "thought">) => void;
}

export function Questionnaire({ thought, onComplete }: QuestionnaireProps) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<Omit<ThoughtData, "thought">>({
		isTrue: "",
		truthScale: 5,
		feeling: "",
		origin: "",
		alternative: "",
	});
	const [animationClass, setAnimationClass] = useState("fade-in");
	const [direction, setDirection] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const questions = [
		{
			id: "isTrue",
			question: "¿Es verdadero este pensamiento?",
			icon: <HelpCircleIcon className="h-5 w-5 text-primary" />,
			component: (
				<RadioGroup
					value={answers.isTrue}
					onValueChange={(value) => handleAnswerChange("isTrue", value)}
					className="space-y-4 mt-6"
					aria-label="Selecciona si el pensamiento es verdadero"
				>
					{[
						{ value: "sí", label: "Sí" },
						{ value: "no", label: "No" },
						{ value: "parcialmente", label: "Parcialmente" },
						{ value: "no estoy seguro", label: "No estoy seguro" },
					].map((option, index) => (
						<motion.div
							key={option.value}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="flex items-center space-x-2"
						>
							<div
								className={`
                relative p-4 rounded-lg border border-muted w-full transition-all duration-200
                ${answers.isTrue === option.value ? "bg-primary/10 border-primary" : "hover:bg-accent"}
              `}
							>
								<div className="flex items-center">
									<RadioGroupItem
										value={option.value}
										id={`isTrue-${option.value}`}
										className={`${answers.isTrue === option.value ? "text-primary" : ""}`}
									/>
									<Label
										htmlFor={`isTrue-${option.value}`}
										className="ml-2 text-base cursor-pointer flex-grow"
									>
										{option.label}
									</Label>
									{answers.isTrue === option.value && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 15,
											}}
											aria-hidden="true"
										>
											<CheckIcon className="h-5 w-5 text-primary" />
										</motion.div>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</RadioGroup>
			),
		},
		{
			id: "truthScale",
			question: "¿Qué tan verdadero es este pensamiento?",
			icon: <ScaleIcon className="h-5 w-5 text-primary" />,
			component: (
				<div className="space-y-8 mt-6">
					<div className="text-center">
						<motion.div
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, type: "spring" }}
							className="relative mx-auto w-32 h-32 mb-4"
							aria-hidden="true"
						>
							<svg
								className="w-full h-full"
								viewBox="0 0 100 100"
								aria-hidden="true"
							>
								<circle
									className="text-muted stroke-current"
									strokeWidth="8"
									cx="50"
									cy="50"
									r="40"
									fill="none"
								/>
								<circle
									className="text-primary stroke-current progress-ring-circle"
									strokeWidth="8"
									strokeLinecap="round"
									cx="50"
									cy="50"
									r="40"
									fill="none"
									strokeDasharray={`${2 * Math.PI * 40}`}
									strokeDashoffset={`${2 * Math.PI * 40 * (1 - answers.truthScale / 10)}`}
								/>
								<text
									x="50"
									y="50"
									fontFamily="sans-serif"
									fontSize="20"
									textAnchor="middle"
									alignmentBaseline="middle"
									className="fill-primary font-bold"
								>
									{answers.truthScale}
								</text>
								<text
									x="50"
									y="65"
									fontFamily="sans-serif"
									fontSize="8"
									textAnchor="middle"
									alignmentBaseline="middle"
									className="fill-muted-foreground"
								>
									de 10
								</text>
							</svg>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Slider
							value={[answers.truthScale]}
							min={1}
							max={10}
							step={1}
							onValueChange={(value) =>
								handleAnswerChange("truthScale", value[0])
							}
							className="py-4"
							aria-label="Escala de verdad del pensamiento"
							aria-valuemin={1}
							aria-valuemax={10}
							aria-valuenow={answers.truthScale}
						/>
						<div className="flex justify-between text-xs text-muted-foreground mt-2">
							<span>1 - Nada verdadero</span>
							<span>10 - Completamente verdadero</span>
						</div>
					</motion.div>
				</div>
			),
		},
		{
			id: "feeling",
			question: "¿Cómo te hace sentir este pensamiento?",
			icon: <HeartIcon className="h-5 w-5 text-primary" />,
			component: (
				<div className="mt-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className={`relative rounded-xl transition-all duration-300 ${
							isTyping ? "ring-2 ring-primary/50 shadow-lg" : "shadow"
						}`}
					>
						<div
							className={`absolute inset-0 rounded-xl ${isTyping ? "shimmer" : ""} pointer-events-none`}
						/>
						<Textarea
							placeholder="Describe tus emociones..."
							value={answers.feeling}
							onChange={(e) => {
								handleAnswerChange("feeling", e.target.value);
								handleTyping();
							}}
							className="min-h-[150px] resize-none rounded-lg border-muted focus:border-primary focus:ring-primary relative z-10"
							aria-label="Describe cómo te hace sentir este pensamiento"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-4 text-xs text-muted-foreground"
					>
						<p>
							Ejemplos: ansiedad, miedo, tristeza, frustración, vergüenza,
							culpa...
						</p>
					</motion.div>
				</div>
			),
		},
		{
			id: "origin",
			question: "¿De dónde viene este pensamiento?",
			icon: <CompassIcon className="h-5 w-5 text-primary" />,
			component: (
				<div className="mt-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className={`relative rounded-xl transition-all duration-300 ${
							isTyping ? "ring-2 ring-primary/50 shadow-lg" : "shadow"
						}`}
					>
						<div
							className={`absolute inset-0 rounded-xl ${isTyping ? "shimmer" : ""} pointer-events-none`}
						/>
						<Textarea
							placeholder="Reflexiona sobre el origen..."
							value={answers.origin}
							onChange={(e) => {
								handleAnswerChange("origin", e.target.value);
								handleTyping();
							}}
							className="min-h-[150px] resize-none rounded-lg border-muted focus:border-primary focus:ring-primary relative z-10"
							aria-label="Describe el origen de este pensamiento"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-4 text-xs text-muted-foreground"
					>
						<p>
							Ejemplos: experiencias pasadas, críticas recibidas, presión
							social, autocrítica...
						</p>
					</motion.div>
				</div>
			),
		},
		{
			id: "alternative",
			question: "¿Hay otra forma de pensar sobre esto?",
			icon: <LightbulbIcon className="h-5 w-5 text-primary" />,
			component: (
				<div className="mt-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className={`relative rounded-xl transition-all duration-300 ${
							isTyping ? "ring-2 ring-primary/50 shadow-lg" : "shadow"
						}`}
					>
						<div
							className={`absolute inset-0 rounded-xl ${isTyping ? "shimmer" : ""} pointer-events-none`}
						/>
						<Textarea
							placeholder="Considera perspectivas alternativas..."
							value={answers.alternative}
							onChange={(e) => {
								handleAnswerChange("alternative", e.target.value);
								handleTyping();
							}}
							className="min-h-[150px] resize-none rounded-lg border-muted focus:border-primary focus:ring-primary relative z-10"
							aria-label="Describe una forma alternativa de pensar sobre esto"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-4 text-xs text-muted-foreground"
					>
						<p>
							Piensa en cómo verías esta situación si le ocurriera a un amigo o
							desde otra perspectiva.
						</p>
					</motion.div>
				</div>
			),
		},
	];

	const handleTyping = () => {
		setIsTyping(true);

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			setIsTyping(false);
		}, 1000);
	};

	useEffect(() => {
		return () => {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
		};
	}, []);

	const handleAnswerChange = (
		field: keyof typeof answers,
		value: string | number,
	) => {
		setAnswers((prev) => ({ ...prev, [field]: value }));
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setDirection(1);
			animateTransition(currentQuestion + 1);
		} else {
			onComplete(answers);
		}
	};

	const handlePrevious = () => {
		if (currentQuestion > 0) {
			setDirection(-1);
			animateTransition(currentQuestion - 1);
		}
	};

	const animateTransition = (nextQuestion: number) => {
		setAnimationClass("slide-out");
		setTimeout(() => {
			setCurrentQuestion(nextQuestion);
			setAnimationClass("slide-in");
		}, 300);
	};

	const isCurrentQuestionAnswered = () => {
		const currentField = questions[currentQuestion].id as keyof typeof answers;
		const answer = answers[currentField];

		if (typeof answer === "number") return true;
		return answer.trim() !== "";
	};

	const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 200 : -200,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 200 : -200,
			opacity: 0,
		}),
	};

	return (
		<div className="space-y-6 relative">
			<div className="blob-bg blob-animation" />

			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-2"
			>
				<div className="text-sm text-muted-foreground">Tu pensamiento:</div>
				<div className="p-4 bg-accent/80 backdrop-blur-sm rounded-lg text-sm italic card-glow">
					{thought}
				</div>
			</motion.div>

			<div className="space-y-6">
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<motion.h3
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-lg font-medium"
						>
							Pregunta {currentQuestion + 1} de {questions.length}
						</motion.h3>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-xs text-muted-foreground"
						>
							{currentQuestion + 1}/{questions.length}
						</motion.div>
					</div>

					<div
						className="relative w-full bg-muted rounded-full h-3 overflow-hidden"
						role="progressbar"
						aria-valuenow={progressPercentage}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label={`Progreso: ${currentQuestion + 1} de ${questions.length} preguntas`}
						tabIndex={0}
					>
						<motion.div
							initial={{
								width: `${(currentQuestion / questions.length) * 100}%`,
							}}
							animate={{ width: `${progressPercentage}%` }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
							className="absolute top-0 left-0 h-full bg-primary rounded-full"
						/>
					</div>
				</div>

				<AnimatePresence custom={direction} mode="wait">
					<motion.div
						key={currentQuestion}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.3, type: "tween" }}
						className="space-y-4"
					>
						<div className="flex items-center gap-3">
							<div
								className="bg-primary/10 p-2.5 rounded-full"
								aria-hidden="true"
							>
								{questions[currentQuestion].icon}
							</div>
							<h4 className="font-medium text-lg">
								{questions[currentQuestion].question}
							</h4>
						</div>
						{questions[currentQuestion].component}
					</motion.div>
				</AnimatePresence>

				<div className="flex justify-between pt-4">
					<Button
						variant="outline"
						onClick={handlePrevious}
						disabled={currentQuestion === 0}
						className="rounded-lg group"
						aria-label="Pregunta anterior"
					>
						<ArrowLeft
							className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
							aria-hidden="true"
						/>
						Anterior
					</Button>

					<motion.div
						initial={{ scale: 0.9, opacity: 0.5 }}
						animate={{
							scale: isCurrentQuestionAnswered() ? 1 : 0.9,
							opacity: isCurrentQuestionAnswered() ? 1 : 0.5,
						}}
						transition={{ duration: 0.3 }}
					>
						<Button
							onClick={handleNext}
							disabled={!isCurrentQuestionAnswered()}
							className="rounded-lg group"
							aria-label={
								currentQuestion < questions.length - 1
									? "Siguiente pregunta"
									: "Finalizar cuestionario"
							}
						>
							{currentQuestion < questions.length - 1 ? (
								<>
									Siguiente
									<ArrowRightIcon
										className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
										aria-hidden="true"
									/>
								</>
							) : (
								<>
									Finalizar
									<CheckIcon className="ml-2 h-4 w-4" aria-hidden="true" />
								</>
							)}
						</Button>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
