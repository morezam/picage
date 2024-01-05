import { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import { FaUndo, FaRedo } from 'react-icons/fa';
import { MdCancel, MdOutlineCancel } from 'react-icons/md';
import ImageInput from '../components/ImageInput';
import ImageDownload from '../components/ImageDownload';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { redoPossible, undoPossible } from '../utils/db';
import { initCanvas } from '../utils/initCanvas';

Modal.setAppElement('#modal');

const Home = () => {
	const [imgName] = useState(() => {
		const imgName = localStorage.getItem('imgName');
		return imgName ? imgName : null;
	});

	const [undoable, setUndoable] = useState(false);
	const [redoable, setRedoable] = useState(false);

	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [isOpen, setOpen] = useState(false);

	const navigate = useNavigate();

	const { src, undo, redo, clear } = useImgSrcContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);

	undoPossible().then(val => setUndoable(val));
	redoPossible().then(val => setRedoable(val));

	const imageToCanvas = useCallback(
		(canvas: fabric.Canvas) => {
			if (src) {
				fabric.Image.fromURL(src, img => {
					initCanvas(img, canvas);

					setCan(canvas);
				});
			}
		},
		[src]
	);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);
		canvas.enableRetinaScaling = true;
		imageToCanvas(canvas);

		window.addEventListener('resize', () => {
			imageToCanvas(canvas);
		});

		return () => {
			canvas.dispose();
		};
	}, [imageToCanvas]);

	function closeModal() {
		setOpen(false);
	}

	const onClear = () => {
		localStorage.removeItem('imgName');
		clear();
		window.history.go(0);
	};

	return (
		<>
			<div className="flex flex-col max-h-screen pb-2 items-center pt-5 max-w-3xl mx-auto">
				{src ? (
					<>
						<div className="flex text-2xl mb-3 flex-row-reverse justify-between w-full px-3 ">
							<ImageDownload originalFilename={imgName} canvas={can} />
							<div className="flex gap-4">
								<button
									disabled={!undoable}
									className={`${!undoable ? 'text-gray-400' : 'text-gray-950'}`}
									onClick={() => undo()}>
									<FaUndo />
								</button>
								<button
									disabled={!redoable}
									className={`${!redoable ? 'text-gray-400' : 'text-gray-950'}`}
									onClick={() => redo()}>
									<FaRedo />
								</button>
							</div>
							<button title="cancel" onClick={() => setOpen(true)}>
								<MdOutlineCancel />
							</button>
						</div>

						<canvas ref={canvasEl} />
						<Tabs
							className="flex flex-col-reverse mr-2 overflow-auto"
							defaultIndex={-1}>
							<TabList className="flex max-w-[200px] whitespace-nowrap py-4 sm:max-w-md overflow-auto">
								<Tab onClick={() => navigate('/crop')}>Crop</Tab>
								<Tab onClick={() => navigate('/text')}>Text</Tab>
								<Tab onClick={() => navigate('/draw')}>Draw</Tab>
								<Tab onClick={() => navigate('/square')}>Square</Tab>
								<Tab onClick={() => navigate('/filters')}>Filters</Tab>
							</TabList>

							<TabPanel></TabPanel>
							<TabPanel></TabPanel>
							<TabPanel></TabPanel>
							<TabPanel></TabPanel>
							<TabPanel></TabPanel>
						</Tabs>
						<Modal
							onRequestClose={closeModal}
							isOpen={isOpen}
							className="flex flex-col text-2xl max-w-lg p-5 outline-none items-center text-center border-2 border-black mx-auto mt-10 relative bg-white">
							<button
								className="absolute right-0 top-0 text-2xl"
								onClick={closeModal}>
								<MdCancel />
							</button>
							<div>
								Do you want to close this project without saving?
								<div className="flex gap-10 my-5 items-center justify-center">
									<button
										className="bg-red-500 px-4 py-2 text-white rounded-md hover:border-red-500 border-2 hover:bg-transparent transition-all duration-300 hover:text-black"
										onClick={onClear}>
										Yes
									</button>
									<button
										className="bg-green-500 px-4 py-2 text-white rounded-md hover:border-green-500 border-2 hover:bg-transparent transition-all duration-300 hover:text-black"
										onClick={closeModal}>
										No
									</button>
								</div>
							</div>
						</Modal>
					</>
				) : (
					<ImageInput />
				)}
			</div>
		</>
	);
};

export default Home;
