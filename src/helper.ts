export function random<T>(options: T[]): T {
	return options[Math.floor(Math.random() * options.length)];
}
export function last<T>(array: T[]): T {
	return array[array.length - 1];
}
