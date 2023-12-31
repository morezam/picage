export const initCanvas = (img: fabric.Image, canvas: fabric.Canvas) => {
	const windowWidth = window.innerWidth;
	img.selectable = false;

	const maxWidth = Math.min(500, windowWidth);
	const width = img.width as number;
	const height = img.height as number;

	const bigger = Math.max(width, height);

	const scale = maxWidth / bigger;

	const oneDecimalScale = Math.floor(scale * 10) / 10;

	const transform = `translate(0,0) rotate(0) skewX(0) skewY(0) scaleX(${oneDecimalScale}) scaleY(${oneDecimalScale})`;

	canvas.setDimensions({ width, height });

	const container = document.querySelector(
		`.${canvas.containerClass}`
	) as HTMLDivElement;

	container.style.width = width + 'px';
	container.style.height = height + 'px';
	container.style.transform = transform;
	container.classList.add(`origin-top`);

	canvas.add(img);
};
