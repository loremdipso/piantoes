
export function todo() {
	throw new Error("do me!");
}

// inspired by from smelte/classes.js
// TODO(perf): is this performant?
export class ClassBuilder {
	private defaultClasses: string[];
	private classes: string[];

	// TODO(feat): add dev detection of duplicate/conflicting styles
	constructor(private defaults: string) {
		this.classes = this.defaultClasses = defaults.split(" ");
	}

	reset() {
		// TODO(perf): is this faster than splitting the string?
		this.classes = [...this.defaultClasses];
		return this;
	}

	add(classes: string) {
		this.add_internal(classes);
		return this;
	}

	addIf(cond: boolean, classes: string) {
		if (cond) {
			this.add_internal(classes);
		}
		return this;
	}

	addIfElse(cond: boolean, classes: string, otherClasses: string) {
		if (cond) {
			this.add_internal(classes);
		} else {
			this.add_internal(otherClasses);
		}
		return this;
	}

	get() {
		return this.classes.join(" ");
	}

	private add_internal(classes: string) {
		if (classes) {
			this.classes.push(...classes.split(" "));
		}
	}
}
