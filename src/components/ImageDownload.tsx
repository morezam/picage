import { saveAs } from 'file-saver';
import base64toBlob from 'b64-to-blob';
import { MdDownloadDone } from 'react-icons/md';
import Compressor from 'compressorjs';

type ImageDownloadProps = {
	originalFilename: string | null;
	canvas: fabric.Canvas | null;
};

const ImageDownload = ({ originalFilename, canvas }: ImageDownloadProps) => {
	const handleDownload = () => {
		if (canvas) {
			const dataURL = canvas.toDataURL();

			const base64Encoded = dataURL.split(',')[1];
			const blob = base64toBlob(base64Encoded, 'image/jpeg');

			if (originalFilename) {
				new Compressor(blob, {
					quality: 0.8,
					success(result) {
						const timestamp = new Date().getTime();
						const fileNameArray = originalFilename.split('.');

						const newFilename = `${fileNameArray[0]}_${timestamp}.${fileNameArray[1]}`;

						saveAs(result, newFilename);
					},
				});
			}
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
