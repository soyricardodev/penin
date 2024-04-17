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
    <div className="css-175 w-full flex-shrink grow sm:w-[600px] md:w-[920px] lg:w-[990px] xl:w-[1050px]">
      <div className="css-175 grow [backface-visibility:hidden]">
        <div className="css-175 min-h-full w-full grow flex-row items-stretch justify-between bg-white">
          {/* Main Form Content */}
          <div className="css-175 z-10 mx-0 w-full max-w-[600px] grow border border-x-[1px] border-[rgb(239,243,244)] bg-white"></div>

          {/* Sidebar Main */}
          <div className="css-175 mr-[70px] w-[350px]">
            <div className="css-175 h-full min-h-[1640px]">
              <div className="css-175 mt-0"></div>

              <div className="css-175 fixed top-0 w-[350px]">
                <div className="css-175 block">
                  <div className="css-175" aria-label="Sidebar Anuncios">
                    <div className="css-175 pb-16 pt-3">
                      {/* Premium Aside */}
                      <div className="css-175">
                        <div className="css-175 mb-4 overflow-hidden rounded-[16px] border border-solid border-[rgb(247,249,249)]">
                          <aside className="css-175 flex-col items-start gap-[10px] px-4">
                            <div className="min-w-0 text-2xl font-extrabold leading-6 text-[rgb(15,20,25)] [overflow-wrap:break-word]">
                              <span>Suscríbete a Premium</span>
                            </div>
                          </aside>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
