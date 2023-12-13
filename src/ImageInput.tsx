import { ChangeEvent } from 'react';

const ImageInput = ({
	setImgSrc,
}: {
	setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
				setImgSrc(src);
				localStorage.setItem('img', src);
			};
			reader.readAsDataURL(file);
		}
	}
	return <input onChange={handleImageUpload} type="file" />;
};

export default ImageInput;
