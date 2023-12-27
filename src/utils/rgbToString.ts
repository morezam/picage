export function rgbToString(rgbaString: string) {
	// Remove 'rgba(' and ')' from the string
	const values = rgbaString.slice(5, -1).split(',');

	// Extract individual values and convert them to numbers
	const r = parseInt(values[0], 10);
	const g = parseInt(values[1], 10);
	const b = parseInt(values[2], 10);
	const a = parseFloat(values[3]);

	// Create and return the object
	const rgbaObject = { r, g, b, a };
	return rgbaObject;
}
