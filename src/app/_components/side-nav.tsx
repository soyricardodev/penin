"use client";

import React from "react";
import { useAuth, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";

import {
  Brain,
  Camera,
  Home,
  Pencil,
  User,
  CircleEllipsis,
} from "lucide-react";

function SideUserActions() {
  return (
    <div className="css-175">
      <div className="css-175 ">
        <SignedIn>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox:
                  "p-2 hover:bg-gray-200 w-full rounded-full transition-colors focus:outline-none",
                userButtonOuterIdentifier:
                  "text-base font-semibold hidden lg:block",
                userButtonAvatarBox: "h-10 w-10",
                userButtonAvatarImage:
                  "h-full w-full object-contain rounded-full",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}

export function SideNav() {
  const items = [
    {
      name: "Inicio",
      icon: Home,
      href: "/",
    },
    {
      name: "Pensamientos",
      icon: Pencil,
      href: "/penin",
    },
    {
      name: "Galeria",
      icon: Camera,
      href: "/galeria",
    },
    {
      name: "Perfil",
      icon: User,
      href: "/perfil",
    },
    {
      name: "Mas opciones",
      icon: CircleEllipsis,
      href: "/opciones",
    },
  ];

  return (
    <header
      className="css-175 flex-end z-[3] flex-grow select-none"
      role="banner"
    >
      <div className="css-175 w-16 sm:w-[88px] lg:w-[275px]">
        <div className="css-175 fixed top-0 h-full [backface-visibility:hidden]">
          <div className="css-175 h-full w-16 justify-between overflow-y-auto px-1 sm:w-[88px] lg:w-[275px]">
            <div className="css-175 items-center">
              {/* Logo */}
              <div className="css-175 max-w-full py-0.5">
                <h1 className="css-175 min-w-8 flex-grow cursor-pointer items-center justify-center self-stretch">
                  <Link
                    href="/"
                    className="css-175 min-h-14 cursor-pointer items-start justify-center rounded-full transition-all [outline-style:none]"
                  >
                    <Brain className="size-9" />
                  </Link>
                </h1>
              </div>
              {/* Navigation */}
              <div className="css-175 mb-1 mt-0.5 w-full items-center">
                <nav
                  className="css-175 flex-col items-center"
                  aria-label="Principal"
                >
                  {items.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      className="css-175 group flex w-full grow flex-col items-start py-1"
                    >
                      <div className="css-175 flex max-w-full flex-row items-center justify-center rounded-full p-3 transition-all group-hover:bg-[rgba(15,20,25,0.1)]">
                        <div className="css-175">
                          <Icon className="relative inline-block h-7 w-7 max-w-full select-none" />
                        </div>
                        <div className="ml-5 mr-4 hidden min-w-0 text-xl leading-6 text-[rgb(15,20,25)] [overflow-wrap:break-word] [text-overflow:unset] lg:block xl:block 2xl:block">
                          <span>{name}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              {/* Escribir btn */}
              <div className="css-175 my-4 w-[90%]">
                <Link
                  href="/penin"
                  className="css-175 h-[52px] w-[52px] cursor-pointer select-none rounded-full border border-white bg-primary transition-colors duration-200 hover:bg-primary/90 lg:min-h-14 lg:w-full lg:min-w-14 lg:px-8"
                >
                  <div className="flex h-full items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-7 fill-white lg:hidden"
                    >
                      <g>
                        <path
                          fill="white"
                          d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
                        ></path>
                      </g>
                    </svg>
                    <span className="hidden text-center text-base font-semibold text-white lg:block">
                      Escribir
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            {/* User Menu */}
            <div className="css-175 my-3 items-center">
              <SideUserActions />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
