"use client";

import { useUser } from "@clerk/nextjs";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	useCarousel,
} from "~/components/ui/carousel";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { ArrowLeft } from "lucide-react";

const ButtonPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
	const { scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			className={cn(className, !canScrollPrev && "hidden")}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			Anterior
			<span className="sr-only">Pregunta Anterior</span>
		</Button>
	);
});

const ButtonNext = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
	const { scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			className={cn(className, !canScrollNext && "hidden")}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			Siguiente
			<span className="sr-only">Pregunta Siguiente</span>
		</Button>
	);
});

export default function HomePage() {
	const { user } = useUser();
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="css-175 w-full flex-shrink grow sm:w-[600px] md:w-[920px] lg:w-[990px] xl:w-[1050px] mx-auto flex-col">
			<TopHeader name={user?.firstName} picUrl={user?.imageUrl} />

			<div className="css-175 grow px-4 w-full">
				<form onSubmit={(e) => e.preventDefault()}>
					<Carousel setApi={setApi} className="w-full my-4">
						<CarouselContent>
							<CarouselItem>
								<Textarea placeholder="¡¿Qué está pasando?!" />
								<div className="mt-4 flex items-center justify-end">
									<ButtonNext />
								</div>
							</CarouselItem>
							<CarouselItem>
								<Textarea placeholder="¿Es cierto este pensamiento?" />
								<div className="mt-4 flex items-center justify-between">
									<ButtonPrevious />
									<ButtonNext />
								</div>
							</CarouselItem>
							<CarouselItem>
								<Textarea placeholder="¿Que tan cierto es?" />
								<div className="mt-4 flex items-center justify-between">
									<ButtonPrevious />
									<ButtonNext />
								</div>
							</CarouselItem>
							<CarouselItem>
								<Textarea placeholder="¿Que me hace sentir?" />
								<div className="mt-4 flex items-center justify-between">
									<ButtonPrevious />
									<ButtonNext />
								</div>
							</CarouselItem>
							<CarouselItem>
								<Textarea placeholder="¿De donde proviene?" />
								<div className="mt-4 flex items-center justify-between">
									<ButtonPrevious />
									<ButtonNext />
								</div>
							</CarouselItem>
							<CarouselItem>
								<Textarea placeholder="¿Hay otra forma de pensar sobre esto?" />
								<div className="mt-4 flex items-center justify-between">
									<ButtonPrevious />
									<Button type="submit" className="border-2 border-secondary">
										Guardar
									</Button>
								</div>
							</CarouselItem>
						</CarouselContent>
					</Carousel>
				</form>
			</div>
		</div>
	);
}

function TopHeader({
	name,
	picUrl,
}: { name: string | null | undefined; picUrl: string | undefined }) {
	return (
		<div className="flex flex-col items-center w-full px-4">
			<div className="flex justify-between w-full items-center mt-2">
				<div className="text-2xl font-black font-display">PENIN</div>
				<Button
					variant="destructive"
					className="uppercase rounded-full text-sm border-2 border-primary text-primary bg-secondary px-4"
					size="sm"
				>
					sos
				</Button>
			</div>

			<div className="w-full flex gap-3 items-center my-8">
				<img
					src={picUrl}
					alt={`${name}'s profile avatar`}
					className="size-14 rounded-full border-[2.5px] border-black"
				/>
				<div>
					<h3 className="font-semibold text-xl font-display">Hola {name}! </h3>
					<p className="font-light text-base font-display leading-4">
						Vamos a explorar lo que esta pasando por tu mente.
					</p>
				</div>
			</div>
		</div>
	);
}
