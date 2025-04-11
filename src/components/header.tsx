import { BrainIcon } from "lucide-react";

export function Header() {
	return (
		<header className="flex items-center gap-2">
			<div className="bg-primary rounded-full p-2">
				<BrainIcon className="h-6 w-6 text-primary-foreground" />
			</div>
			<h1 className="text-3xl font-bold text-primary">PENIN</h1>
		</header>
	);
}
