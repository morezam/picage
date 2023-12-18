import { ChangeEvent } from 'react';
import { useImgInfoContext } from '../context/imgInfoContext';

const ImageInput = () => {
	const { setImgInfo } = useImgInfoContext();

	function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target as HTMLInputElement;

		if (!input.files?.length) {
			return;
		}

		const file = input.files[0];
		if (file) {
			const reader = new FileReader();
			console.log(file);
			reader.onload = function (e) {
				const src = e.target?.result as string;
				const imgInfo = { src, name: file.name };
				setImgInfo(imgInfo);
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
