import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { calculateAspectRatioFit } from '../utils/calculateAspectRatioFit';
import Range from '../components/Range';

const Filters = () => {
	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});
	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [img, setImg] = useState<fabric.Image | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		fabric.Image.fromURL(imgSrc, img => {
			img.selectable = false;
			const maxWidth = 600;
			const width = img.width as number;
			const height = img.height as number;
			const { newWidth, newHeight } = calculateAspectRatioFit(
				width,
				height,
				maxWidth,
				maxWidth
			);

			const bigger = Math.max(width, height);

			const scale = maxWidth / bigger;
			img.set({ scaleX: scale, scaleY: scale });
			canvas.setDimensions({ width: newWidth, height: newHeight });

			setImg(img);

			canvas.add(img);

			setCan(canvas);
		});

		return () => {
			canvas.dispose();
		};
	}, [imgSrc]);

	const onSave = () => {
		if (can) {
			const newSrc = can.toDataURL({ quality: 1 });
			localStorage.setItem('img', newSrc);
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
		<>
			<div className="flex justify-between pl-10 bg-slate-200">
				<canvas ref={canvasEl} />
				<Tabs className="flex flex-row-reverse mr-2">
					<TabList className="flex flex-col">
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
								applyFilter(
									new fabric.Image.filters.Pixelate({ blocksize: 20 })
								)
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
					<TabPanel>
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
							initToMax
							rangeCb={val =>
								applyFilter(new fabric.Image.filters.Blur({ blur: val }))
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={0}
							max={1}
							initToMax
							step={0.01}
							rangeCb={val =>
								applyFilter(
									new fabric.Image.filters.Contrast({ contrast: val })
								)
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={50}
							max={500}
							step={50}
							initToMax
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
							initToMax
							rangeCb={val =>
								applyFilter(
									new fabric.Image.filters.Pixelate({ blocksize: val })
								)
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={0}
							max={10}
							step={1}
							initToMax
							rangeCb={val =>
								applyFilter(
									new fabric.Image.filters.Saturation({ saturation: val })
								)
							}
						/>
					</TabPanel>
				</Tabs>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Filters;
