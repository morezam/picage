import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { initCanvas } from '../utils/initCanvas';

const Filters = () => {
	const { src, setSrc } = useImgSrcContext();

	const navigate = useNavigate();

	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [img, setImg] = useState<fabric.Image | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	const imageToCanvas = useCallback(
		(canvas: fabric.Canvas) => {
			if (src) {
				fabric.Image.fromURL(src, img => {
					initCanvas(img, canvas);
					setImg(img);
					setCan(canvas);
				});
			}
		},
		[src]
	);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		imageToCanvas(canvas);

		window.addEventListener('resize', () => {
			imageToCanvas(canvas);
		});
		return () => {
			canvas.dispose();
		};
	}, [imageToCanvas]);

	const onSave = () => {
		if (can) {
			can.viewportTransform = [1, 0, 0, 1, 0, 0];
			const newSrc = can.toDataURL({
				quality: 1,
			});
			setSrc(newSrc);
			navigate('/');
		}
	};

	const applyFilter = (filter: fabric.IBaseFilter) => {
		if (img) {
			img.filters = [];
			img.filters?.push(filter);
			img.applyFilters();
			can?.add(img);
		}
	};

	return (
		<MainLayout onSave={onSave} onCancel={() => navigate('/')}>
			<canvas ref={canvasEl} />
			<Tabs className="flex flex-col-reverse mr-2 z-10" defaultIndex={-1}>
				<TabList className="flex max-w-[200px] py-4 whitespace-nowrap xs:max-w-md overflow-auto">
					<Tab
						onClick={() => applyFilter(new fabric.Image.filters.Grayscale())}>
						grayscale
					</Tab>
					<Tab>blend color</Tab>
					<Tab
						onClick={() =>
							applyFilter(new fabric.Image.filters.Blur({ blur: 0.5 }))
						}>
						blur
					</Tab>
					<Tab
						onClick={() =>
							applyFilter(new fabric.Image.filters.Contrast({ contrast: 1 }))
						}>
						contrast
					</Tab>
					<Tab
						onClick={() =>
							applyFilter(new fabric.Image.filters.Noise({ noise: 500 }))
						}>
						noise
					</Tab>
					<Tab
						onClick={() =>
							applyFilter(new fabric.Image.filters.Pixelate({ blocksize: 20 }))
						}>
						pixelate
					</Tab>
					<Tab
						onClick={() =>
							applyFilter(
								new fabric.Image.filters.Saturation({ saturation: 10 })
							)
						}>
						saturation
					</Tab>
					<Tab onClick={() => applyFilter(new fabric.Image.filters.Invert())}>
						invert
					</Tab>
					<Tab onClick={() => applyFilter(new fabric.Image.filters.Sepia())}>
						sepia
					</Tab>
				</TabList>

				<TabPanel></TabPanel>
				<TabPanel className="flex justify-center">
					<ColorPicker
						cb={color =>
							applyFilter(new fabric.Image.filters.BlendColor({ color }))
						}
					/>
				</TabPanel>
				<TabPanel>
					<Range
						min={0}
						max={0.5}
						step={0.01}
						initVal={0.5}
						rangeCb={val =>
							applyFilter(new fabric.Image.filters.Blur({ blur: val }))
						}
					/>
				</TabPanel>
				<TabPanel>
					<Range
						min={0}
						max={1}
						initVal={1}
						step={0.01}
						rangeCb={val =>
							applyFilter(new fabric.Image.filters.Contrast({ contrast: val }))
						}
					/>
				</TabPanel>
				<TabPanel>
					<Range
						min={50}
						max={500}
						step={50}
						initVal={500}
						rangeCb={val =>
							applyFilter(new fabric.Image.filters.Noise({ noise: val }))
						}
					/>
				</TabPanel>
				<TabPanel>
					<Range
						min={0}
						max={20}
						step={1}
						initVal={20}
						rangeCb={val =>
							applyFilter(new fabric.Image.filters.Pixelate({ blocksize: val }))
						}
					/>
				</TabPanel>
				<TabPanel>
					<Range
						min={0}
						max={10}
						step={1}
						initVal={10}
						rangeCb={val =>
							applyFilter(
								new fabric.Image.filters.Saturation({ saturation: val })
							)
						}
					/>
				</TabPanel>
				<TabPanel></TabPanel>
				<TabPanel></TabPanel>
			</Tabs>
		</MainLayout>
	);
};

export default Filters;
