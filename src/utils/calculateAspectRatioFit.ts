export function calculateAspectRatioFit(
	srcWidth: number,
	srcHeight: number,
	maxWidth: number,
	maxHeight: number
) {
	const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

	return { newWidth: srcWidth * ratio, newHeight: srcHeight * ratio };
}
