import { ChangeEvent } from 'react';
import { useImgSrcContext } from '../hooks/useImgSrcContext';

const ImageInput = () => {
	const { setSrc } = useImgSrcContext();

	function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target as HTMLInputElement;

		if (!input.files?.length) {
			return;
		}

		const file = input.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const src = e.target?.result as string;
				localStorage.setItem('imgName', file.name);
				setSrc(src);
			};
			reader.readAsDataURL(file);
		}
	}
	return (
		<input
			onChange={handleImageUpload}
			type="file"
			accept="image/png, image/jpeg"
		/>
	);
};

export default ImageInput;
