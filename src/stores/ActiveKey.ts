import type { IKey } from "../interfaces";
import { writable } from 'svelte/store';

export const active_key = writable<IKey | null>(null);