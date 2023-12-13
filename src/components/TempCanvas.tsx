/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TempCanvasProps = {
	cb: any;
};

const TempCanvas = ({ cb }: TempCanvasProps) => {
	const canRef = createRef<HTMLCanvasElement>();
	const [done, setDone] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (done) {
			const newSrc = canRef.current?.toDataURL() as string;

			localStorage.setItem('img', newSrc);

			navigate(0);
		}
	}, [canRef, done, navigate]);

	const onSave = () => {
		const canvasEl = canRef.current as HTMLCanvasElement;
		const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

		cb(canvasEl, ctx, setDone);
	};

	return (
		<>
			<button onClick={onSave}>save</button>
			<canvas ref={canRef} className="hidden"></canvas>
		</>
	);
};

export default TempCanvas;
