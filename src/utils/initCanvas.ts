export const initCanvas = (img: fabric.Image, canvas: fabric.Canvas) => {
	const windowWidth =
		window.innerWidth > 0 ? window.innerWidth : window.screen.width;

	img.selectable = false;

	const maxWidth = Math.min(500, windowWidth);
	const width = img.width as number;
	const height = img.height as number;

	const bigger = Math.max(width, height);

	const scale = maxWidth / bigger;

	const oneDecimalScale = Math.floor(scale * 10) / 10;

	canvas.setDimensions({ width, height });

	canvas.viewportTransform = [oneDecimalScale, 0, 0, oneDecimalScale, 0, 0];

	const container = document.querySelector(
		`.${canvas.containerClass}`
	) as HTMLDivElement;

	container.style.width = width * oneDecimalScale + 'px';
	container.style.height = height * oneDecimalScale + 'px';

	container.style.maxWidth = '100vw';
	container.style.overflow = 'hidden';

	canvas.add(img);
};
