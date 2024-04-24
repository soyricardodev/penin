import Link from "next/link";
import { Brain, Camera, CircleEllipsis, Home } from "lucide-react";

export function FloatingNav() {
	const items = [
		{
			name: "Inicio",
			icon: Home,
			href: "/",
		},
		{
			name: "Galeria",
			icon: Camera,
			href: "/galeria",
		},
		{
			name: "Mas opciones",
			icon: CircleEllipsis,
			href: "/opciones",
		},
	];

	return (
		<nav className="absolute border-2 border-secondary z-50 bottom-7 mx-auto inset-x-0 h-20 max-w-md w-full rounded-full bg-primary flex items-center justify-center md:hidden lg:hidden xl:hidden 2xl:hidden shadow-xl">
			<ul className="flex items-center justify-evenly w-full">
				<li>
					<Link href="/" className="rounded-full bg-secondary block py-2 px-4">
						<span className="sr-only">Escribir</span>
						<svg viewBox="0 0 24 24" aria-hidden="true" className="size-8">
							<g>
								<path
									className="fill-primary"
									d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
								/>
							</g>
						</svg>
					</Link>
				</li>
				{items.map(({ name, href, icon: Icon }) => (
					<li key={name}>
						<Link
							href={href}
							className="hover:bg-secondary transition-colors rounded-full block p-2 group"
						>
							<Icon className="size-8 text-secondary group-hover:text-primary transition-colors" />
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
