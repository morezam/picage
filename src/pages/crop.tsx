/* eslint-disable @typescript-eslint/no-explicit-any */
import Cropper, { type ReactCropperElement } from 'react-cropper';
import { useState, useRef } from 'react';
import TempCanvas from '../components/TempCanvas';
import Rotate from '../components/Rotate';

const Crop = () => {
	const [imgInfo, setImgInfo] = useState({
		height: 0,
		width: 0,
		x: 0,
		y: 0,
	});

	const cropperRef = useRef<ReactCropperElement>(null);

	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

	const canCb = (
		canvasEl: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		setDone: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		const { x, y, width, height } = imgInfo;
		canvasEl.height = +height;
		canvasEl.width = +width;

		const img = new Image();
		img.onload = function () {
			ctx.drawImage(img, +x, +y, +width, +height, 0, 0, +width, +height);
			setDone(true);
		};
		img.src = imgSrc;
	};

	const onCrop = (event: any) => {
		const { x, y, width, height } = event.detail;
		setImgInfo({
			x,
			y,
			width,
			height,
		});
	};

	return (
		<div className="flex flex-col items-center">
			<Cropper
				src={imgSrc}
				crop={onCrop}
				ref={cropperRef}
				viewMode={2}
				autoCrop={true}
				autoCropArea={1}
				dragMode="none"
				modal={false}
				background={false}
			/>
			<TempCanvas cb={canCb} />
			{cropperRef.current && <Rotate cropper={cropperRef.current.cropper} />}
		</div>
	);
};

export default Crop;
