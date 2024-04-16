"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";

export default function HomePage() {
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
    <div className="css-175 flex-shrink grow md:w-[920px] lg:w-[990px] xl:w-[1050px]">
      <div>
        <h2 className="text-left text-3xl font-semibold">Hola, Natalia.</h2>
      </div>
      <form>
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem>
              <div>
                <Label htmlFor="">Describe tu pensamiento</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Label htmlFor="">¿Es cierto este pensamiento?</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Label htmlFor="">¿Es cierto este pensamiento?</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Label htmlFor="">¿Que tan cierto es?</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Label htmlFor="">¿Que me hace sentir?</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Label htmlFor="">¿De donde proviene?</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <Label htmlFor="">¿Hay otra forma de pensar sobre esto?</Label>

                <Textarea placeholder="" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Button type="submit">Crear</Button>
      </form>
    </div>
  );
}
