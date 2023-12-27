import { saveAs } from 'file-saver';
import base64toBlob from 'b64-to-blob';
import { MdDownloadDone } from 'react-icons/md';

type ImageDownloadProps = {
	originalFilename: string;
	canvas: fabric.Canvas | null;
};

const ImageDownload = ({ originalFilename, canvas }: ImageDownloadProps) => {
	const handleDownload = () => {
		if (canvas) {
			const dataURL = canvas.toDataURL({
				format: 'image/jpeg',
				quality: 0.8,
			});
			const base64Encoded = dataURL.split(',')[1];
			const blob = base64toBlob(base64Encoded);
			const timestamp = new Date().getTime();
			const fileNameArray = originalFilename.split('.');

			const newFilename = `${fileNameArray[0]}_${timestamp}.${fileNameArray[1]}`;

			saveAs(blob, newFilename);
		}
	};

	return (
		<div>
			<button onClick={handleDownload}>
				<MdDownloadDone />
			</button>
		</div>
	);
};

export default ImageDownload;
