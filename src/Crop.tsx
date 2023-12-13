import Cropper from 'cropperjs';
import { createRef, useEffect, useState } from 'react';

const Photo = () => {
	const [imgInfo, setImgInfo] = useState({
		height: '',
		width: '',
		x: '',
		y: '',
		src: '',
	});

	const canRef = createRef<HTMLCanvasElement>();

	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

	const [done, setDone] = useState(false);

	useEffect(() => {
		const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
		const img = document.querySelector('img') as HTMLImageElement;

		wrapper.style.width = img.naturalWidth + 'px';
		wrapper.style.height = img.naturalHeight + 'px';

		new Cropper(img, {
			viewMode: 2,
			dragMode: 'none',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			crop(event: any) {
				const { x, y, width, height } = event.detail;

				setImgInfo({
					x,
					y,
					width,
					height,
					src: img.src,
				});
			},
			autoCrop: true,
			autoCropArea: 1,
		});
	}, []);

	const onSave = () => {
		const { x, y, width, height, src } = imgInfo;

		const canvasEl = canRef.current as HTMLCanvasElement;
		const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

		canvasEl.height = +height;
		canvasEl.width = +width;

		const img = new Image();
		img.onload = function () {
			ctx.drawImage(img, +x, +y, +width, +height, 0, 0, +width, +height);
			setDone(true);
		};
		img.src = src;
	};

	useEffect(() => {
		if (done) {
			const newSrc = canRef.current?.toDataURL() as string;

			localStorage.setItem('img', newSrc);

			window.location.reload();
		}
	}, [canRef, done]);

	return (
		<div className="relative">
			<div className="wrapper mx-auto mt-5">
				<img className="block max-w-full" src={imgSrc} alt="" />
			</div>
			<button onClick={onSave}>save</button>
			<canvas className="hidden" ref={canRef}></canvas>
		</div>
	);
};

export default Photo;
