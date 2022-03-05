export enum NoteType {
	A = "a",
	B = "b",
	C = "c",
	D = "d",
	E = "e",
	F = "f",
	G = "g",
}

export interface IKey {
	type: NoteType;
	octave: number;
	sharp?: boolean;
	name: string;
	audio: HTMLAudioElement;
}