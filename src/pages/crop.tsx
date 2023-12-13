import Cropper from 'cropperjs';
import { useEffect, useState } from 'react';
import TempCanvas from '../components/TempCanvas';

const Crop = () => {
	const [imgInfo, setImgInfo] = useState({
		height: '',
		width: '',
		x: '',
		y: '',
		src: '',
	});

	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

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

	const canCb = (
		canvasEl: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		setDone: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		const { x, y, width, height, src } = imgInfo;
		canvasEl.height = +height;
		canvasEl.width = +width;

		const img = new Image();
		img.onload = function () {
			ctx.drawImage(img, +x, +y, +width, +height, 0, 0, +width, +height);
			setDone(true);
		};
		img.src = src;
	};

	return (
		<div className="flex flex-col items-center">
			<div className="wrapper mt-5">
				<img className="block max-w-full" src={imgSrc} alt="" />
			</div>
			<TempCanvas cb={canCb} />
		</div>
	);
};

export default Crop;
