export function parseLinearGradient(
	ctx: CanvasRenderingContext2D,
	linearGradient: string,
	width: number,
	height: number
) {
	const gradient = ctx.createLinearGradient(0, 0, width, height);
	const stops = linearGradient.match(/rgba?\([^)]+\)\s*\d*\.?\d*%/g);

	if (stops) {
		stops.forEach(stop => {
			const index = +stop.split(' ')[3].split('%')[0] / 100;
			const color = stop.split(') ')[0].concat(')');
			gradient.addColorStop(index, color);
		});
	}

	return gradient;
}
