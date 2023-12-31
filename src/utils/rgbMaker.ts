import { RGBColor } from 'react-color';

// turns rgb object into rgb string
export const rgbMaker = (color: RGBColor) => {
	const { r, g, b, a } = color;

	const alpha = ensureNumber(a);

	const stringColor = `rgba(${r},${g},${b},${alpha})`;
	return stringColor;
};

function ensureNumber(value: number | undefined) {
	if (typeof value === 'number' && !isNaN(value)) {
		return value;
	} else {
		return 1;
	}
}
