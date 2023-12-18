import { saveAs } from 'file-saver';
import base64toBlob from 'b64-to-blob';

type ImageDownloadProps = {
	originalFilename: string;
	canvas: HTMLCanvasElement | null;
};

const ImageDownload = ({ originalFilename, canvas }: ImageDownloadProps) => {
	const handleDownload = () => {
		if (canvas) {
			const dataURL = canvas.toDataURL('image/jpeg', 0.8);
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
			<button onClick={handleDownload}>Download Image</button>
		</div>
	);
};

export default ImageDownload;
