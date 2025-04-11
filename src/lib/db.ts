import Dexie, { type Table } from "dexie";
import type { ThoughtData } from "@/components/thought-processor";

export interface SavedThought extends ThoughtData {
	id?: number;
	savedAt: Date;
}

class ThoughtDatabase extends Dexie {
	thoughts!: Table<SavedThought>;

	constructor() {
		super("peninDatabase");
		this.version(1).stores({
			thoughts: "++id, savedAt",
		});
	}
}

export const db = new ThoughtDatabase();

export async function saveThought(thought: ThoughtData): Promise<number> {
	const savedThought: SavedThought = {
		...thought,
		savedAt: new Date(),
	};

	return await db.thoughts.add(savedThought);
}

export async function getAllThoughts(): Promise<SavedThought[]> {
	return await db.thoughts.orderBy("savedAt").reverse().toArray();
}

export async function getThoughtsQuery(): Promise<SavedThought[]> {
	return await db.thoughts.toArray();
}

export async function getThoughtById(
	id: number,
): Promise<SavedThought | undefined> {
	return await db.thoughts.get(id);
}

export async function deleteThought(id: number): Promise<void> {
	await db.thoughts.delete(id);
}
