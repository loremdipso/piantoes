import type { IKey } from "interfaces";
import { NoteType } from "interfaces";

function get_audio(slug: string) {
	const audio = new Audio(`resources/${slug}.mp3`);
	return audio;
}

function create_key({ type, octave, sharp }: { type: NoteType, octave: number, sharp?: boolean }): IKey {
	return {
		type,
		octave,
		sharp,
		name: `${type.toString().toLocaleUpperCase()}${octave}${sharp ? "#" : ""}`,
		audio: get_audio(`${type}${octave}${sharp ? "_sharp" : ""} `)
	};
}

export const KEYS: IKey[] = [
	create_key({ type: NoteType.C, octave: 4 }),
	create_key({ type: NoteType.C, octave: 4, sharp: true }),

	create_key({ type: NoteType.D, octave: 4 }),
	create_key({ type: NoteType.D, octave: 4, sharp: true }),

	create_key({ type: NoteType.E, octave: 4 }),
	create_key({ type: NoteType.F, octave: 4 }),
	create_key({ type: NoteType.F, octave: 4, sharp: true }),

	create_key({ type: NoteType.G, octave: 4 }),
	create_key({ type: NoteType.G, octave: 4, sharp: true }),

	create_key({ type: NoteType.A, octave: 5 }),
	create_key({ type: NoteType.A, octave: 5, sharp: true }),
	create_key({ type: NoteType.B, octave: 5 }),
];

// NOTE: normally we wouldn't want to mutate global state during module load, but
// whatever. It's a css property - what could go wrong?
const num_white_keys = KEYS.filter(key => !key.sharp).length;
document.documentElement.style.setProperty("--num-white-keys", `${num_white_keys} `);