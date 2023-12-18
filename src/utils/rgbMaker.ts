/* eslint-disable @typescript-eslint/no-explicit-any */
export const rgbMaker = (color: {
	r: number;
	g: number;
	b: number;
	a?: number;
}) => {
	const { r, g, b, a } = color;

	const alpha = ensureNumber(a);

	const stringColor = `rgba(${r},${g},${b},${alpha})`;
	return stringColor;
};

function ensureNumber(value: any) {
	if (typeof value === 'number' && !isNaN(value)) {
		return value;
	} else {
		return 1;
	}
}
