/* eslint-disable @typescript-eslint/no-explicit-any */
import Cropper, { type ReactCropperElement } from 'react-cropper';
import { useState, useRef } from 'react';
import Rotate from '../components/Rotate';

const Crop = () => {
	const cropperRef = useRef<ReactCropperElement>(null);

	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

	const onSave = () => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			const newSrc = cropper.getCroppedCanvas().toDataURL();

			localStorage.setItem('img', newSrc);
		}
	};

	return (
		<>
			<Cropper
				src={imgSrc}
				ref={cropperRef}
				viewMode={2}
				autoCrop={true}
				autoCropArea={1}
				dragMode="none"
				modal={false}
				background={false}
			/>
			<button onClick={onSave}>save</button>
			{cropperRef.current && <Rotate cropper={cropperRef.current.cropper} />}
		</>
	);
};

export default Crop;
