/* eslint-disable @typescript-eslint/no-explicit-any */
import Cropper, { type ReactCropperElement } from 'react-cropper';
import { useState, useRef, useEffect } from 'react';
import { useImgInfoContext } from '../context/imgInfoContext';

const Crop = () => {
	const { imgInfo, setImgInfo } = useImgInfoContext();

	const cropperRef = useRef<ReactCropperElement>(null);
	const [rotData, setRotData] = useState(0);

	useEffect(() => {
		const cropper = cropperRef.current?.cropper;

		const aspectGroup = document.querySelector('.aspectGroup') as Element;

		const aspectChildren = [...aspectGroup.children];

		aspectChildren.forEach(btn => {
			btn.addEventListener('click', () => {
				const [first, second] = btn.innerHTML.split(':');

				if (cropper) {
					cropper.setAspectRatio(+first / +second);
				}
			});
		});
	}, []);

	const onSave = () => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			const newSrc = cropper.getCroppedCanvas().toDataURL();

			setImgInfo({ ...imgInfo, src: newSrc });
		}
	};

	const onReset = () => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			cropper.reset();
			setRotData(0);
			cropper.setAspectRatio(NaN);
		}
	};

	const onRotate = () => {
		const cropper = cropperRef.current?.cropper;
		if (cropper) {
			cropper.rotate(90);
			const rotData = cropper.getData().rotate as number;
			setRotData(rotData);
		}
	};

	return (
		<>
			<Cropper
				src={imgInfo.src}
				ref={cropperRef}
				viewMode={2}
				autoCrop={true}
				autoCropArea={1}
				dragMode="none"
				modal={false}
				background={false}
			/>
			<button className="block" onClick={onSave}>
				save
			</button>
			<button className="block" onClick={onReset}>
				reset
			</button>
			<button
				onClick={onRotate}
				className={`${rotData !== 0 ? 'bg-orange-400' : ''}`}>
				rotate
			</button>
			<div className="aspectGroup">
				<button>normal</button>
				<button>4:4</button>
				<button>16:9</button>
				<button>4:3</button>
			</div>
		</>
	);
};

export default Crop;
