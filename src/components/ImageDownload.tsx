import { saveAs } from 'file-saver';

type ImageDownloadProps = {
	originalFilename: string;
	canvas: HTMLCanvasElement | null;
};

const ImageDownload = ({ originalFilename, canvas }: ImageDownloadProps) => {
	const handleDownload = () => {
		const timestamp = new Date().getTime();

		const fileNameArray = originalFilename.split('.');

		const newFilename = `${fileNameArray[0]}_${timestamp}.${fileNameArray[1]}`;

		if (canvas) {
			canvas.toBlob(function (blob) {
				saveAs(blob as Blob, newFilename);
			});
		}
	};

	return (
		<div>
			<button onClick={handleDownload}>Download Image</button>
		</div>
	);
};

export default ImageDownload;
